import {
  AnimationKeyframe,
  BasicKeyframeAnimationConfig, Keyframe,
  KeyframeAnimationConfig,
  KeyframeAnimationListener,
  KeyframeAnimationType,
  KeyframeAnimationTypes
} from './types';
import {List} from '../../../data-structure/list/list';

interface KeyframesFinderValue extends AnimationKeyframe{
  commonConfig: KeyframeAnimationConfig,
  listenerHandler: ElementListenerHandler
}

export class KeyframesFinder {
  private finder = new Map<string, KeyframesFinderValue>();

  public addAnimationKeyframe(animationKeyframe: AnimationKeyframe) {
    const finderValue: KeyframesFinderValue = {
      animationName: animationKeyframe.animationName,
      keyframe: animationKeyframe.keyframe,
      commonConfig: KeyframesFinder.computeProperConfig(animationKeyframe.commonConfig),
      listenerHandler: new ElementListenerHandler()
    };
    this.finder.set(animationKeyframe.animationName, finderValue);
  }

  private static computeProperConfig(config: KeyframeAnimationConfig): KeyframeAnimationConfig {
    const basicConfig = {...BasicKeyframeAnimationConfig};
    if ( !config ) {
      return basicConfig;
    }

    return Object.assign(basicConfig, config);
  }

  public getWholeAnimationKeyframes(): AnimationKeyframe[] {
    return Array.from(this.finder.values()).map(finderValue => ({
      animationName: finderValue.animationName,
      keyframe: finderValue.keyframe,
      commonConfig: finderValue.commonConfig
    }));
  }

  public getAnimationKeyframe(animationName: string): AnimationKeyframe {
    return this.finder.get(animationName);
  }

  public getCommonConfig(animationName: string) {
    return this.finder.get(animationName).commonConfig;
  }

  public removeKeyframe(animName: string) {
    this.finder.get(animName).listenerHandler.clear();
    this.finder.delete(animName);
  }

  public subscribeAnimationListener(animName: string, element: HTMLElement, animationListener: KeyframeAnimationListener) {
    this.finder.get(animName).listenerHandler.subscribeEvent(element, animationListener);
  }

  public unSubscribeAnimationListener(animName: string, element: HTMLElement) {
    this.finder.get(animName).listenerHandler.unSubscribeEvent(element);
  }

  public setAnimationConfig(animName: string, config: KeyframeAnimationConfig) {
    this.finder.get(animName).commonConfig = config;
  }

  public removeAnimationListener(animName: string) {
    this.finder.get(animName).listenerHandler.clear();
  }

  /** clear all of object at memory */
  public clear() {
    Array.from(this.finder.values())
      .forEach(finderValue => finderValue.listenerHandler.clear());
    this.finder.clear();
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
