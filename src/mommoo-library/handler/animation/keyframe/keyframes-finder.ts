import {KeyframeAnimationListener, KeyframeAnimationType, KeyframeAnimationTypes, KeyframePrefix, Keyframe} from '../types';
import {CssConverter} from './css-converter';
import {List} from '../../../data-structure/list/list';

export class KeyframesFinder {
  /** animationName, [ keyFramesString, elementListenerHandler] */
  private finder = new Map<string, [string, ElementListenerHandler]>();

  public addKeyframes(animName: string, keyFrames : Keyframe) {
    const keyFramesCssString = CssConverter.convertKeyFramesToCssString(keyFrames);
    const allBrowserKeyFrameCSS = KeyframePrefix
      .map(prefix => `${prefix}keyframes ${animName}`)
      .map(keyframePrefix => `${keyframePrefix}${keyFramesCssString}`)
      .join("");
    this.finder.set(animName, [allBrowserKeyFrameCSS, new ElementListenerHandler()]);
  }

  public wholeCssKeyFrames() : string {
    return Array.from(this.finder.entries())
      .map(entry => entry[1][0])
      .join("");
  }

  public removeKeyframes(animName: string) {
    this.finder.get(animName)[1].clear();
    this.finder.delete(animName);
  }

  public subscribeAnimationListener(animName: string, element: HTMLElement, animationListener: KeyframeAnimationListener) {
    this.finder.get(animName)[1].subscribeEvent(element, animationListener);
  }

  public unSubscribeAnimationListener(animName: string, element: HTMLElement) {
    this.finder.get(animName)[1].unSubscribeEvent(element);
  }

  public removeAnimationListener(animName: string) {
    this.finder.get(animName)[1].clear();
  }

  /** clear all of object at memory */
  public clear() {
    Array.from(this.finder.keys())
      .forEach(animationName => this.removeKeyframes(animationName));
    this.finder.clear();
  }

  public toString(): string {
    return Array.from(this.finder)
      .map(value => [value[0], value[1][0], value[1][1]])
      .toString()
  }
}

class ElementListenerHandler {
  private readonly elementEventFinder = new Map<HTMLElement, any>();

  public static createKeyframesEventListener(element: HTMLElement, eventListener: KeyframeAnimationListener) {
    return (event) => {
      switch(event.type) {
        case "animationstart":
          eventListener(KeyframeAnimationType.ANIMATION_START);
          break;
        case "animationend":
          eventListener(KeyframeAnimationType.ANIMATION_END);
          break;
        case "animationiteration":
          eventListener(KeyframeAnimationType.ANIMATION_ITERATION);
          break;
        default:
          break;
      }
    }
  }

  public subscribeEvent(element: HTMLElement, eventListener: KeyframeAnimationListener) {
    if ( this.elementEventFinder.has(element) ){
      return;
    }
    const keyframesEventListener = ElementListenerHandler.createKeyframesEventListener(element, eventListener);
    this.elementEventFinder.set(element, keyframesEventListener);
    KeyframeAnimationTypes
      .forEach(eventName => element.addEventListener(eventName, keyframesEventListener));
  }

  public unSubscribeEvent(element: HTMLElement) {
    if ( this.elementEventFinder.has(element) ){
      this.removeAllListenerAt(element);
      this.elementEventFinder.delete(element);
    }
  }

  public elementList(): List<HTMLElement> {
    return new List<HTMLElement>(...Array.from(this.elementEventFinder.keys()));
  }

  public clear() {
    this.elementEventFinder.forEach((listener, element)=> this.removeAllListenerAt(element));
    this.elementEventFinder.clear();
  }

  private removeAllListenerAt(element: HTMLElement) {
    KeyframeAnimationTypes
      .forEach(eventName => element.removeEventListener(eventName, this.elementEventFinder.get(element)));
  }

  public toString(): string {
    return this.elementList().toString();
  }
}
