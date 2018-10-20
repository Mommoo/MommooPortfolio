import {AnimationTarget, BasicKeyframeAnimationConfig, Keyframe, KeyframeAnimationConfig, KeyframeAnimationListener} from '../types';
import {ElementRef} from '@angular/core';
import {DomUtils} from '../../../util/dom';
import {KeyframesFinder} from './keyframes-finder';
import {KeyframeElementMonitor} from './keyframe-element-monitor';

export class KeyframeAnimator {
  private styleElement : HTMLStyleElement;
  private keyframesFinder = new KeyframesFinder();
  private keyframeElementMonitor = new KeyframeElementMonitor();

  private writeStyle(cssString : string) {
    if ( this.styleElement === undefined ) {
      this.styleElement = document.createElement('style');
      this.styleElement.type ='text/css';
      document.head.appendChild(this.styleElement);
    }
    this.styleElement.innerHTML = cssString;
  }

  public addKeyframe(animationName : string, keyframe : Keyframe) {
    this.keyframesFinder.addKeyframes(animationName, keyframe);
    this.writeStyle(this.keyframesFinder.wholeCssKeyFrames());
  }

  public removeKeyframe(animationName: string) {
    this.keyframesFinder.removeKeyframes(animationName);
    this.writeStyle(this.keyframesFinder.wholeCssKeyFrames());
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

  public startAnimation(elementRef: ElementRef<HTMLElement>, config: KeyframeAnimationConfig);

  public startAnimation(element: HTMLElement, config: KeyframeAnimationConfig)

  public startAnimation(target: AnimationTarget, config: KeyframeAnimationConfig) {
    const targetElement = DomUtils.takeElementIfWrappedRef(target);

    this.keyframeElementMonitor.monitorTo(targetElement);

    KeyframeAnimator.triggerReflowForReStart(targetElement);

    const animationConfig = {
      ...BasicKeyframeAnimationConfig,
      ...config
    };

    KeyframeAnimator.setKeyframeConfigToElement(targetElement, animationConfig);
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

  private static triggerReflowForReStart(element: HTMLElement) {
    element.style.animationName='mommoo';
    window.getComputedStyle(element).animationName;
  }

  private static setAnimationPlayState(target: AnimationTarget, state : 'paused' | 'running') {
    const targetElement = DomUtils.takeElementIfWrappedRef(target);
    DomUtils.applyStyle(targetElement, {animationPlayState: state})
  }

  private static setKeyframeConfigToElement(element: HTMLElement, config: KeyframeAnimationConfig) {
    DomUtils.applyStyle(element, {
      animationName: config.name,
      animationDuration: config.duration,
      animationDelay: config.delay,
      animationTimingFunction: config.timingFunction,
      animationFillMode: config.fillMode,
      animationIterationCount: config.iterationCount.toString(),
      animationDirection: config.direction
    });
  }

  public clear() {
    this.keyframeElementMonitor.clear();
    this.keyframesFinder.clear();
    if ( this.styleElement.parentElement ) {
      this.styleElement.parentElement.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }
}
