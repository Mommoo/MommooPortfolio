import {AnimationTarget, BasicKeyframeAnimationConfig, KeyframeAnimationConfig, KeyframeAnimationListener, Keyframe} from './types';
import {ElementRef} from '@angular/core';
import {DomUtils} from '../../util/dom';
import {KeyframesFinder} from './keyframes-finder';

export class KeyframeAnimator {
  private styleElement : HTMLStyleElement;
  private keyFramesFinder = new KeyframesFinder();
  private relatedElementSets = new Set<HTMLElement>();

  private writeStyle(cssString : string) {
    if ( this.styleElement === undefined ) {
      this.styleElement = document.createElement('style');
      this.styleElement.type ='text/css';
      document.head.appendChild(this.styleElement);
    }
    this.styleElement.innerHTML = cssString;
  }

  public addKeyframe(animationName : string, keyframe : Keyframe) {
    this.keyFramesFinder.addKeyframes(animationName, keyframe);
    this.writeStyle(this.keyFramesFinder.wholeCssKeyFrames());
  }

  public removeKeyframe(animationName: string) {
    this.keyFramesFinder.removeKeyframes(animationName);
    this.writeStyle(this.keyFramesFinder.wholeCssKeyFrames());
  }

  public subscribeAnimationListener(animationName: string, element: HTMLElement, animListener: KeyframeAnimationListener) {
    this.keyFramesFinder.subscribeAnimationListener(animationName, element, animListener);
  }

  public unSubscribeAnimationListener(animationName: string, element: HTMLElement) {
    this.keyFramesFinder.unSubscribeAnimationListener(animationName, element);
  }

  public clearAnimationListener(animationName: string) {
    this.keyFramesFinder
  }

  public startAnimation(elementRef: ElementRef<HTMLElement>, config: KeyframeAnimationConfig);

  public startAnimation(element: HTMLElement, config: KeyframeAnimationConfig)

  public startAnimation(target: AnimationTarget, config: KeyframeAnimationConfig) {
    const targetElement = DomUtils.takeElementIfWrappedRef(target);

    this.relatedElementSets.add(targetElement);

    /** force redraw or reflow to start keyframes animation */
    KeyframeAnimator.resetKeyframeAnimation(targetElement);

    const animationConfig = Object.assign({...BasicKeyframeAnimationConfig}, config);

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

  private static resetKeyframeAnimation(element: HTMLElement) {
    element.style.animation = null;
  }

  public clear() {
    this.relatedElementSets
      .forEach(element=> KeyframeAnimator.resetKeyframeAnimation(element));
    this.relatedElementSets.clear();

    this.keyFramesFinder.clear();

    if ( this.styleElement.parentElement ) {
      this.styleElement.parentElement.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }
}
