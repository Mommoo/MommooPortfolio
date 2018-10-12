import {KeyFrameAnimationListener, KeyFrameAnimationType, KeyFrameAnimationTypes, KeyFramePrefix, KeyFrames} from './types';
import {CssConverter} from './css-converter';
import {List} from '../../data-structure/list/list';

export class KeyframesFinder {
  /** animationName, [ keyFramesString, elementListenerHandler] */
  private finder = new Map<string, [string, ElementListenerHandler]>();

  public addKeyFrames(animName:string, keyFrames : KeyFrames) {
    const keyFramesCssString = CssConverter.convertKeyFramesToCssString(keyFrames);
    const allBrowserKeyFrameCssString = KeyFramePrefix
      .map(prefix => `${prefix}keyframes ${animName}`)
      .map(keyframePrefix => `${keyframePrefix}${keyFramesCssString}`)
      .join("");
    this.finder.set(animName, [allBrowserKeyFrameCssString, undefined]);
  }

  public wholeCssKeyFrames() : string {
    return Array.from(this.finder.entries())
      .map(entry => entry[1][0])
      .join("");
  }

  public removeKeyFrames(animName: string) {
    this.removeAnimationListener(animName);
    this.finder.delete(animName);
  }

  public addAnimationListener(animName: string, animListener: KeyFrameAnimationListener) {
    const [keyFrames, handler] = this.finder.get(animName);
    if ( handler === undefined ) {
      this.finder.set(animName, [keyFrames, new ElementListenerHandler(animListener)]);
    }
  }

  public removeAnimationListener(animName: string) {
    const [keyFrames, handler] = this.finder.get(animName);
    if ( handler !== undefined ) {
      handler.clear();
    }
    this.finder.set(animName, [keyFrames, undefined]);
  }

  public addElementToListenerHandler(animName:string, element: HTMLElement) {
    if ( this.finder.get(animName)[1] ) {
      this.finder.get(animName)[1].subscribeEvent(element);
    }
  }

  public removeElementToListenerHandler(animName: string, element: HTMLElement) {
    if ( this.finder.get(animName)[1] ) {
      this.finder.get(animName)[1].unSubscribeEvent(element);
    }
  }

  public animationRelatedElements() : List<HTMLElement> {
    const relatedElementList = new List<HTMLElement>();

    Array.from(this.finder.values())
      .map(frames => frames[1].elementList())
      .forEach(elementList => relatedElementList.addAll(elementList));

    return relatedElementList;
  }

  /** clear all of object at memory */
  public clear() {
    Array.from(this.finder.keys())
      .forEach(animationName => this.removeKeyFrames(animationName));
    this.finder.clear();
  }

  public toString(): string {
    return Array.from(this.finder)
      .map(value => [value[0], value[1][0], value[1][1]])
      .toString()
  }
}

class ElementListenerHandler {
  private readonly elementSets = new Set<HTMLElement>();
  private readonly callbackEvent;

  public constructor(listener: KeyFrameAnimationListener) {
    this.callbackEvent = (event) => {
      switch(event.type) {
        case "animationstart":
          listener(KeyFrameAnimationType.ANIMATION_START);
          break;
        case "animationend":
          listener(KeyFrameAnimationType.ANIMATION_END);
          break;
        case "animationiteration":
          listener(KeyFrameAnimationType.ANIMATION_ITERATION);
          break;
        default:
          break;
      }
    };
  }

  public subscribeEvent(element: HTMLElement) {
    if ( this.elementSets.has(element) ){
      return;
    }
    this.elementSets.add(element);
    KeyFrameAnimationTypes
      .forEach(eventName => element.addEventListener(eventName, this.callbackEvent))
  }

  public unSubscribeEvent(element: HTMLElement) {
    if ( this.elementSets.has(element) ){
      this.removeAllListenerAt(element);
      this.elementSets.delete(element);
    }
  }

  public elementList(): List<HTMLElement> {
    return new List<HTMLElement>(...Array.from(this.elementSets));
  }

  public clear() {
    this.elementSets.forEach(element=> this.removeAllListenerAt(element))
    this.elementSets.clear();
  }

  private removeAllListenerAt(element: HTMLElement) {
    KeyFrameAnimationTypes
      .forEach(eventName => element.removeEventListener(eventName, this.callbackEvent))
  }

  public toString(): string {
    return this.elementList().toString();
  }
}
