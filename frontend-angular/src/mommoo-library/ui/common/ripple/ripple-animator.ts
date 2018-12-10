import {KeyframeAnimator} from '../../../handler/animation/keyframe/keyframe-animator';
import {Injectable} from '@angular/core';
import {RippleRef, RippleState} from './ripple-types';
import {RippleEventHandler} from './ripple-event-handler.service';
import {RippleConfig} from './ripple-config';
import {
  AnimationKeyframe,
  KeyframeAnimationConfig,
  KeyframeAnimationListener,
  KeyframeAnimationType
} from '../../../handler/animation/keyframe/types';

@Injectable()
export class RippleAnimator {
  private static readonly rippleFadeInName = 'mommoo-ui-rippleElement-fade-in';
  private static readonly rippleFadeOutName = 'mommoo-ui-rippleElement-fade-out';

  private static readonly keyframeAnimator = RippleAnimator.createRippleKeyframeAnimator();

  private static createRippleKeyframeAnimator() {
    const rippleKeyframeAnimator = new KeyframeAnimator();
    const defaultConfig: KeyframeAnimationConfig = {
      fillMode: 'forwards',
      timingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
    };
    const fadeInAnimationKeyframe: AnimationKeyframe = {
      animationName: RippleAnimator.rippleFadeInName,
      keyframe: {
        from: {
          transform: 'scale(0.2)'
        },
        to: {
          transform: 'scale(1)'
        }
      },
      commonConfig: {...defaultConfig}
    };

    const fadeOutAnimationKeyframe: AnimationKeyframe = {
      animationName: RippleAnimator.rippleFadeOutName,
      keyframe: {
        from: {
          opacity: 1
        },
        to: {
          opacity: 0
        }
      },
      commonConfig: {...defaultConfig}
    };

    rippleKeyframeAnimator.addKeyframes([fadeInAnimationKeyframe, fadeOutAnimationKeyframe]);

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
    this.startFadeAnimation(RippleAnimator.rippleFadeInName, rippleRef.view, animationListener);
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
    this.startFadeAnimation(RippleAnimator.rippleFadeOutName, rippleRef.view, animationListener);
  }

  private startFadeAnimation(animationName: string, element: HTMLElement, animationListener: KeyframeAnimationListener) {
    RippleAnimator.keyframeAnimator.subscribeAnimationListener(animationName, element, animationListener);
    RippleAnimator.keyframeAnimator.startAnimation(animationName, element, {duration: `${this.rippleConfig.fadeInDuration}ms`});
  }

  public destroy() {
    RippleAnimator.keyframeAnimator.clearAnimationListener(RippleAnimator.rippleFadeInName);
    RippleAnimator.keyframeAnimator.clearAnimationListener(RippleAnimator.rippleFadeOutName);
  }
}
