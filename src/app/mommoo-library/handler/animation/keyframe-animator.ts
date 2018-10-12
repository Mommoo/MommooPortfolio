import {AnimationTarget, BasicKeyFrameAnimationConfig, KeyFrameAnimationConfig, KeyFrameAnimationListener, KeyFrames} from './types';
import {ElementRef} from '@angular/core';
import {DomUtils} from '../../util/dom';
import {KeyframesFinder} from './keyframes-finder';

export class KeyframeAnimator {
  private styleElement : HTMLStyleElement;
  private keyFramesFinder = new KeyframesFinder();

  private writeStyle(cssString : string) {
    if ( this.styleElement === undefined ) {
      this.styleElement = document.createElement('style');
      this.styleElement.type ='text/css';
      document.head.appendChild(this.styleElement);
    }
    this.styleElement.innerHTML = cssString;
  }

  public addKeyFrames(animationName : string, keyFrames : KeyFrames) {
    this.keyFramesFinder.addKeyFrames(animationName, keyFrames);
    this.writeStyle(this.keyFramesFinder.wholeCssKeyFrames());
  }

  public removeKeyFrames(animationName: string) {
    this.keyFramesFinder.removeKeyFrames(animationName);
    this.writeStyle(this.keyFramesFinder.wholeCssKeyFrames());
  }

  public subscribeAnimationListener(animationName: string, animListener: KeyFrameAnimationListener) {
    this.keyFramesFinder.addAnimationListener(animationName, animListener);
  }

  public unSubscribeAnimationListener(animationName: string) {
    this.keyFramesFinder.removeAnimationListener(animationName);
  }

  public startAnimation(elementRef: ElementRef<HTMLElement>, config: KeyFrameAnimationConfig);

  public startAnimation(element: HTMLElement, config: KeyFrameAnimationConfig)

  public startAnimation(target: AnimationTarget, config: KeyFrameAnimationConfig) {
    const targetElement = DomUtils.takeElementIfWrappedRef(target);

    KeyframeAnimator.readyForAnimationStart(targetElement);

    this.keyFramesFinder.addElementToListenerHandler(config.name, targetElement);


    const animationConfig = Object.assign({...BasicKeyFrameAnimationConfig}, config);

    KeyframeAnimator.setKeyFrameConfigToElement(targetElement, animationConfig);
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

  private static readyForAnimationStart(element: HTMLElement) {
    /** clear animation css for re-start */
    KeyframeAnimator.setKeyFrameConfigToElement(element, BasicKeyFrameAnimationConfig);
    /** set animation state 'running' for re-start */
    KeyframeAnimator.setAnimationPlayState(element, 'running');
  }

  private static setKeyFrameConfigToElement(element: HTMLElement, config: KeyFrameAnimationConfig) {
    DomUtils.applyStyle(element, {
      animationName: config.name,
      animationDuration: config.duration,
      animationDelay: config.delay,
      animationTimingFunction: config.timingFunction,
      animationFillMode: config.fillMode,
      animationIterationCount: config.iterationCount,
      animationDirection: config.direction
    });
  }

  private static removeAllAnimationCSS(element: HTMLElement) {
    DomUtils.applyStyle(element, {
      animationName: '',
      animationDuration: '',
      animationDelay: '',
      animationTimingFunction: '',
      animationFillMode: '',
      animationIterationCount: '',
      animationDirection: '',
      animationPlayState: ''
    });
  }

  public clear() {
    this.keyFramesFinder
      .animationRelatedElements()
      .forEach(element=> KeyframeAnimator.removeAllAnimationCSS(element));
    this.keyFramesFinder.clear();
    if ( this.styleElement.parentElement ) {
      this.styleElement.parentElement.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }
}
