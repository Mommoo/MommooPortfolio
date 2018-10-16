import {KeyframeAnimator} from '../../../handler/animation/keyframe-animator';
import {KeyframeAnimationConfig, KeyframeAnimationListener, KeyframeAnimationType} from '../../../handler/animation/types';
import {Injectable} from '@angular/core';
import {RippleRef, RippleState} from './ripple-types';
import {RippleEventHandler} from './ripple-event-handler.service';
import {RippleConfig} from './ripple-config';

@Injectable()
export class RippleAnimator {
  private static readonly rippleFadeInName = 'mommoo-ui-rippleElement-fade-in';
  private static readonly rippleFadeOutName = 'mommoo-ui-rippleElement-fade-out';
  private static readonly defaultConfig: KeyframeAnimationConfig = {
    name: '',
    fillMode: 'forwards',
    timingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
  };

  private static readonly keyframeAnimator = RippleAnimator.createRippleKeyframeAnimator();

  private static createRippleKeyframeAnimator() {
    const rippleKeyframeAnimator = new KeyframeAnimator();
    rippleKeyframeAnimator.addKeyframe(RippleAnimator.rippleFadeInName, {
      from: {
        transform: 'scale(0.2)'
      },
      to: {
        transform: 'scale(1)'
      }
    });

    rippleKeyframeAnimator.addKeyframe(RippleAnimator.rippleFadeOutName, {
      from: {
        opacity: 1
      },
      to: {
        opacity: 0
      }
    });

    return rippleKeyframeAnimator;
  }

  public constructor(private rippleEventHandler: RippleEventHandler,
                     private rippleConfig: RippleConfig) {

  }

  public startFadeIn(rippleRef: RippleRef) {
    rippleRef.status = RippleState.FADE_IN_START;
    const animationListener = type => {
      if ( type === KeyframeAnimationType.ANIMATION_END ) {
        rippleRef.status = RippleState.FADE_IN_END;
        if (rippleRef.executeFadeOutNextFadeIn) {
          this.startFadeOut(rippleRef);
        }

        RippleAnimator.keyframeAnimator.unSubscribeAnimationListener(RippleAnimator.rippleFadeInName, rippleRef.view);
      }
    };
    const fadeInConfig = RippleAnimator
      .createFadeConfig(RippleAnimator.rippleFadeInName, this.rippleConfig.fadeInDuration);
    RippleAnimator.startFadeAnimation(rippleRef.view, fadeInConfig, animationListener);
  }

  public startFadeOut(rippleRef: RippleRef) {
    rippleRef.status = RippleState.FADE_OUT_START;
    const animationListener = type => {
      if ( type === KeyframeAnimationType.ANIMATION_END ) {
        rippleRef.status = RippleState.FADE_OUT_END;
        RippleAnimator.keyframeAnimator.unSubscribeAnimationListener(RippleAnimator.rippleFadeOutName, rippleRef.view);
        this.rippleEventHandler.executeOnRippleDoneEvent(rippleRef);
      }
    };
    const fadeOutConfig = RippleAnimator
      .createFadeConfig(RippleAnimator.rippleFadeOutName, this.rippleConfig.fadeOutDuration);
    RippleAnimator.startFadeAnimation(rippleRef.view, fadeOutConfig, animationListener);
  }

  private static startFadeAnimation(element: HTMLElement, fadeConfig: KeyframeAnimationConfig, animationListener: KeyframeAnimationListener) {
    RippleAnimator.keyframeAnimator.subscribeAnimationListener(fadeConfig.name, element, animationListener);
    RippleAnimator.keyframeAnimator.startAnimation(element, fadeConfig);
  }

  private static createFadeConfig(name: string, duration: number): KeyframeAnimationConfig {
    return {
      ...RippleAnimator.defaultConfig,
      name: name,
      duration: `${duration}ms`
    }
  }

  public destroy() {
    RippleAnimator.keyframeAnimator.clearAnimationListener(RippleAnimator.rippleFadeInName);
    RippleAnimator.keyframeAnimator.clearAnimationListener(RippleAnimator.rippleFadeOutName);
  }
}
