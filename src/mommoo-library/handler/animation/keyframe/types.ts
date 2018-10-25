import {DomCSSStyle} from '../../../util/types';
import {ElementRef} from '@angular/core';

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

export interface AnimationKeyframe {
  animationName: string,
  keyframe: Keyframe,
  commonConfig?: KeyframeAnimationConfig
}

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
  duration?: string,
  delay?: string,
  timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | any,
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
  iterationCount?: number | 'infinite',
  direction? : 'alternate' | 'alternate-reverse' | 'normal' | 'reverse'
}

export const BasicKeyframeAnimationConfig: KeyframeAnimationConfig = {
  duration: '500ms',
  delay: '0s',
  timingFunction: 'ease',
  fillMode: 'none',
  iterationCount: 1,
  direction: 'alternate'
};

export const convertConfigToVendorCSSObject = (config: KeyframeAnimationConfig): DomCSSStyle => {
  const normalConfig = {
    animationDuration: config.duration,
    animationDelay: config.delay,
    animationTimingFunction: config.timingFunction,
    animationFillMode: config.fillMode,
    animationIterationCount: config.iterationCount,
    animationDirection: config.direction
  };

  const webkitConfig = {
    webkitAnimationDuration: config.duration,
    webkitAnimationDelay: config.delay,
    webkitAnimationTimingFunction: config.timingFunction,
    webkitAnimationFillMode: config.fillMode,
    webkitAnimationIterationCount: config.iterationCount,
    webkitAnimationDirection: config.direction
  };
  const vendorConfig = {
    ...normalConfig,
    ...webkitConfig
  };
  return Object.keys(vendorConfig).reduce((config, key)=> {
    const value = vendorConfig[key];
    if ( value ){
      config[key] = vendorConfig[key];
    }
    return config;
  },{});
};

export type AnimationTarget = HTMLElement | ElementRef<HTMLElement>

Object.freeze(KeyframePrefix);
Object.freeze(KeyframeAnimationTypes);
Object.freeze(BasicKeyframeAnimationConfig);
