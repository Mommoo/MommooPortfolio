import {ElementRef} from '@angular/core';

export interface KeyFrames {
  from? : object,
  to? : object,
  '0%'? : object,
  '1%'? : object,
  '2%'? : object,
  '3%'? : object,
  '4%'? : object,
  '5%'? : object,
  '6%'? : object,
  '7%'? : object,
  '8%'? : object,
  '9%'? : object,
  '10%'? : object,
  '11%'? : object,
  '12%'? : object,
  '13%'? : object,
  '14%'? : object,
  '15%'? : object,
  '16%'? : object,
  '17%'? : object,
  '18%'? : object,
  '19%'? : object,
  '20%'? : object,
  '21%'? : object,
  '22%'? : object,
  '23%'? : object,
  '24%'? : object,
  '25%'? : object,
  '26%'? : object,
  '27%'? : object,
  '28%'? : object,
  '29%'? : object,
  '30%'? : object,
  '31%'? : object,
  '32%'? : object,
  '33%'? : object,
  '34%'? : object,
  '35%'? : object,
  '36%'? : object,
  '37%'? : object,
  '38%'? : object,
  '39%'? : object,
  '40%'? : object,
  '41%'? : object,
  '42%'? : object,
  '43%'? : object,
  '44%'? : object,
  '45%'? : object,
  '46%'? : object,
  '47%'? : object,
  '48%'? : object,
  '49%'? : object,
  '50%'? : object,
  '51%'? : object,
  '52%'? : object,
  '53%'? : object,
  '54%'? : object,
  '55%'? : object,
  '56%'? : object,
  '57%'? : object,
  '58%'? : object,
  '59%'? : object,
  '60%'? : object,
  '61%'? : object,
  '62%'? : object,
  '63%'? : object,
  '64%'? : object,
  '65%'? : object,
  '66%'? : object,
  '67%'? : object,
  '68%'? : object,
  '69%'? : object,
  '70%'? : object,
  '71%'? : object,
  '72%'? : object,
  '73%'? : object,
  '74%'? : object,
  '75%'? : object,
  '76%'? : object,
  '77%'? : object,
  '78%'? : object,
  '79%'? : object,
  '80%'? : object,
  '81%'? : object,
  '82%'? : object,
  '83%'? : object,
  '84%'? : object,
  '85%'? : object,
  '86%'? : object,
  '87%'? : object,
  '88%'? : object,
  '89%'? : object,
  '90%'? : object,
  '91%'? : object,
  '92%'? : object,
  '93%'? : object,
  '94%'? : object,
  '95%'? : object,
  '96%'? : object,
  '97%'? : object,
  '98%'? : object,
  '99%'? : object,
  '100%'? : object
}

export const KeyFramePrefix = ['@-moz-', '@-webkit-', '-o-', '-ms-', '@'];

export enum KeyFrameAnimationType {
  ANIMATION_START = 'animationstart',
  ANIMATION_END = 'animationend',
  ANIMATION_ITERATION ='animationiteration'
}

export const KeyFrameAnimationTypes : KeyFrameAnimationType[] = [
  KeyFrameAnimationType.ANIMATION_START,
  KeyFrameAnimationType.ANIMATION_END,
  KeyFrameAnimationType.ANIMATION_ITERATION
];

export type KeyFrameAnimationListener = (type : KeyFrameAnimationType) => void;

export interface KeyFrameAnimationConfig {
  name: string
  duration?: string,
  delay?: string,
  timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'cubic-bezier',
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  iterationCount?: number | 'infinite',
  direction? : 'alternate' | 'alternate-reverse'
}

export const BasicKeyFrameAnimationConfig: KeyFrameAnimationConfig = {
  name: '',
  duration: '500ms',
  delay: '0s',
  timingFunction: 'ease',
  fillMode: 'none',
  iterationCount: 1,
  direction: 'alternate'
};

export type AnimationTarget = HTMLElement | ElementRef<HTMLElement>

Object.freeze(KeyFramePrefix);
Object.freeze(KeyFrameAnimationTypes);
Object.freeze(BasicKeyFrameAnimationConfig);
