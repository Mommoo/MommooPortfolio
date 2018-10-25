import {
  AnimationKeyframe,
  AnimationTarget,
  convertConfigToVendorCSSObject,
  KeyframeAnimationConfig,
  KeyframeAnimationListener
} from './types';
import {ElementRef} from '@angular/core';
import {DomUtils} from '../../../util/dom';
import {KeyframesFinder} from './keyframes-finder';
import {KeyframeElementMonitor} from './keyframe-element-monitor';
import {KeyframeStyleWriter} from './keyframe-style-writer';

export class KeyframeAnimator {
  private keyframeStyleWriter = new KeyframeStyleWriter();
  private keyframesFinder = new KeyframesFinder();
  private keyframeElementMonitor = new KeyframeElementMonitor();

  public addKeyframe(animationKeyFrame: AnimationKeyframe) {
    this.keyframesFinder.addAnimationKeyframe(animationKeyFrame);
    this.writeKeyframeToStyle();
  }

  public addKeyframes(frames: AnimationKeyframe[]){
    frames
      .forEach(animKeyframe => this.keyframesFinder.addAnimationKeyframe(animKeyframe));
    this.writeKeyframeToStyle();
  }

  public removeKeyframe(animationName: string) {
    this.keyframesFinder.removeKeyframe(animationName);
    this.writeKeyframeToStyle();
  }

  public setCommonAnimationConfig(animationName: string, commonConfig: KeyframeAnimationConfig) {
    this.keyframesFinder.setAnimationConfig(animationName, commonConfig);
  }

  public subscribeAnimationListener(animationName: string, element: HTMLElement, animListener: KeyframeAnimationListener) {
    this.keyframesFinder.subscribeAnimationListener(animationName, element, animListener);
  }

  public unSubscribeAnimationListener(animationName: string, element: HTMLElement) {
    this.keyframesFinder.unSubscribeAnimationListener(animationName, element);
  }

  public clearAnimationListener(animationName: string) {
    this.keyframesFinder.removeAnimationListener(animationName);
  }

  public startAnimation(animationName: string, elementRef: ElementRef<HTMLElement>, independentConfig?: KeyframeAnimationConfig);

  public startAnimation(animationName: string, element: HTMLElement, independentConfig?: KeyframeAnimationConfig)

  public startAnimation(animationName: string, target: AnimationTarget, independentConfig?: KeyframeAnimationConfig) {
    const element = DomUtils.takeElementIfWrappedRef(target);
    const animationConfig = this.buildToConfig(animationName, independentConfig);

    this.keyframeElementMonitor.monitorTo(element);

    KeyframeAnimator.clearAnimationName(element);
    KeyframeAnimator.triggerAnimation(animationName, element, animationConfig);
  }

  public pauseAnimation(elementRef: ElementRef<HTMLElement>);

  public pauseAnimation(element: HTMLElement)

  public pauseAnimation(target: AnimationTarget) {
    KeyframeAnimator.setAnimationPlayState(target, 'paused');
  }

  public resumeAnimation(elementRef: ElementRef<HTMLElement>);

  public resumeAnimation(element: HTMLElement);

  public resumeAnimation(target: AnimationTarget) {
    KeyframeAnimator.setAnimationPlayState(target, 'running');
  }

  private writeKeyframeToStyle() {
    const animationKeyframes = this.keyframesFinder.getWholeAnimationKeyframes();
    this.keyframeStyleWriter.writeKeyframes(animationKeyframes);
  }

  private static clearAnimationName(element: HTMLElement) {
    element.style.animationName = null;
    /** trigger reflow for ready to start animation that same to previous animation  */
    getComputedStyle(element).animationName;
  }

  private static triggerAnimation(animationName: string, element: HTMLElement, animationConfig: KeyframeAnimationConfig) {
    DomUtils.applyStyle(element, {
      ...convertConfigToVendorCSSObject(animationConfig),
      animationName: animationName
    });
  }

  private buildToConfig(animationName: string, independentConfig?: KeyframeAnimationConfig) {
    let animationConfig = this.keyframesFinder.getCommonConfig(animationName);

    if ( independentConfig ) {
      animationConfig = {
        ...animationConfig,
        ...independentConfig
      }
    }

    return animationConfig;
  }

  private static setAnimationPlayState(target: AnimationTarget, state : 'paused' | 'running') {
    const targetElement = DomUtils.takeElementIfWrappedRef(target);
    DomUtils.applyStyle(targetElement, {animationPlayState: state})
  }

  public clear() {
    this.keyframeStyleWriter.clear();
    this.keyframeElementMonitor.clear();
    this.keyframesFinder.clear();
  }
}
