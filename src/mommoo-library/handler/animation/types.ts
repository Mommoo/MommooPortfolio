import {ElementRef} from '@angular/core';
import {DomCSSStyle} from '../../util/types';

export interface Keyframe {
  from? : DomCSSStyle,
  to? : DomCSSStyle,
  '0%'? : DomCSSStyle,
  '1%'? : DomCSSStyle,
  '2%'? : DomCSSStyle,
  '3%'? : DomCSSStyle,
  '4%'? : DomCSSStyle,
  '5%'? : DomCSSStyle,
  '6%'? : DomCSSStyle,
  '7%'? : DomCSSStyle,
  '8%'? : DomCSSStyle,
  '9%'? : DomCSSStyle,
  '10%'? : DomCSSStyle,
  '11%'? : DomCSSStyle,
  '12%'? : DomCSSStyle,
  '13%'? : DomCSSStyle,
  '14%'? : DomCSSStyle,
  '15%'? : DomCSSStyle,
  '16%'? : DomCSSStyle,
  '17%'? : DomCSSStyle,
  '18%'? : DomCSSStyle,
  '19%'? : DomCSSStyle,
  '20%'? : DomCSSStyle,
  '21%'? : DomCSSStyle,
  '22%'? : DomCSSStyle,
  '23%'? : DomCSSStyle,
  '24%'? : DomCSSStyle,
  '25%'? : DomCSSStyle,
  '26%'? : DomCSSStyle,
  '27%'? : DomCSSStyle,
  '28%'? : DomCSSStyle,
  '29%'? : DomCSSStyle,
  '30%'? : DomCSSStyle,
  '31%'? : DomCSSStyle,
  '32%'? : DomCSSStyle,
  '33%'? : DomCSSStyle,
  '34%'? : DomCSSStyle,
  '35%'? : DomCSSStyle,
  '36%'? : DomCSSStyle,
  '37%'? : DomCSSStyle,
  '38%'? : DomCSSStyle,
  '39%'? : DomCSSStyle,
  '40%'? : DomCSSStyle,
  '41%'? : DomCSSStyle,
  '42%'? : DomCSSStyle,
  '43%'? : DomCSSStyle,
  '44%'? : DomCSSStyle,
  '45%'? : DomCSSStyle,
  '46%'? : DomCSSStyle,
  '47%'? : DomCSSStyle,
  '48%'? : DomCSSStyle,
  '49%'? : DomCSSStyle,
  '50%'? : DomCSSStyle,
  '51%'? : DomCSSStyle,
  '52%'? : DomCSSStyle,
  '53%'? : DomCSSStyle,
  '54%'? : DomCSSStyle,
  '55%'? : DomCSSStyle,
  '56%'? : DomCSSStyle,
  '57%'? : DomCSSStyle,
  '58%'? : DomCSSStyle,
  '59%'? : DomCSSStyle,
  '60%'? : DomCSSStyle,
  '61%'? : DomCSSStyle,
  '62%'? : DomCSSStyle,
  '63%'? : DomCSSStyle,
  '64%'? : DomCSSStyle,
  '65%'? : DomCSSStyle,
  '66%'? : DomCSSStyle,
  '67%'? : DomCSSStyle,
  '68%'? : DomCSSStyle,
  '69%'? : DomCSSStyle,
  '70%'? : DomCSSStyle,
  '71%'? : DomCSSStyle,
  '72%'? : DomCSSStyle,
  '73%'? : DomCSSStyle,
  '74%'? : DomCSSStyle,
  '75%'? : DomCSSStyle,
  '76%'? : DomCSSStyle,
  '77%'? : DomCSSStyle,
  '78%'? : DomCSSStyle,
  '79%'? : DomCSSStyle,
  '80%'? : DomCSSStyle,
  '81%'? : DomCSSStyle,
  '82%'? : DomCSSStyle,
  '83%'? : DomCSSStyle,
  '84%'? : DomCSSStyle,
  '85%'? : DomCSSStyle,
  '86%'? : DomCSSStyle,
  '87%'? : DomCSSStyle,
  '88%'? : DomCSSStyle,
  '89%'? : DomCSSStyle,
  '90%'? : DomCSSStyle,
  '91%'? : DomCSSStyle,
  '92%'? : DomCSSStyle,
  '93%'? : DomCSSStyle,
  '94%'? : DomCSSStyle,
  '95%'? : DomCSSStyle,
  '96%'? : DomCSSStyle,
  '97%'? : DomCSSStyle,
  '98%'? : DomCSSStyle,
  '99%'? : DomCSSStyle,
  '100%'? : DomCSSStyle
}
export const Vendors = ['moz', 'ms', 'webkit', 'o'];
export const KeyframePrefix = ['@-moz-', '@-webkit-', '-o-', '-ms-', '@'];

export enum KeyframeAnimationType {
  ANIMATION_START = 'animationstart',
  ANIMATION_END = 'animationend',
  ANIMATION_ITERATION ='animationiteration'
}

export const KeyframeAnimationTypes : KeyframeAnimationType[] = [
  KeyframeAnimationType.ANIMATION_START,
  KeyframeAnimationType.ANIMATION_END,
  KeyframeAnimationType.ANIMATION_ITERATION
];

export type KeyframeAnimationListener = (type : KeyframeAnimationType) => void;

export interface KeyframeAnimationConfig {
  name: string
  duration?: string,
  delay?: string,
  timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | any,
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  iterationCount?: number | 'infinite',
  direction? : 'alternate' | 'alternate-reverse'
}

export const BasicKeyframeAnimationConfig: KeyframeAnimationConfig = {
  name: '',
  duration: '500ms',
  delay: '0s',
  timingFunction: 'ease',
  fillMode: 'none',
  iterationCount: 1,
  direction: 'alternate'
};

export type AnimationTarget = HTMLElement | ElementRef<HTMLElement>

Object.freeze(KeyframePrefix);
Object.freeze(KeyframeAnimationTypes);
Object.freeze(BasicKeyframeAnimationConfig);

export type Easing = 'linear' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad'
  | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart'
  | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint';

export interface FrameAnimationConfig {
  duration?: number,
  easing?: Easing,
}

export interface EasingFunctionType {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint
}

export const EasingFunctions: EasingFunctionType = {
  // no easing, no acceleration
  linear: (t: number) => t,
  // accelerating from zero velocity
  easeInQuad: (t :number) => t*t,
  // decelerating to zero velocity
  easeOutQuad: (t: number) =>  t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: (t: number) =>  t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity
  easeInCubic: (t: number) =>  t*t*t,
  // decelerating to zero velocity
  easeOutCubic: (t: number) =>  (--t)*t*t+1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: (t: number) =>  t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity
  easeInQuart: (t: number) =>  t*t*t*t,
  // decelerating to zero velocity
  easeOutQuart: (t: number) =>  1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t: number) =>  t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: (t: number) =>  t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: (t: number) =>  1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: (t: number) => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
};

export interface FrameAnimationState {
  progress:number,
  elapsedTime: number
}

export type FrameAnimationStatusListener = (state: FrameAnimationState) => void;
