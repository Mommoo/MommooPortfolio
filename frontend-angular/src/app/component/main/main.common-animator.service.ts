import {ElementRef, Injectable, OnDestroy} from '@angular/core';
import {KeyframeAnimator} from '../../../mommoo-library/handler/animation/keyframe/keyframe-animator';
import {AnimationKeyframe, KeyframeAnimationConfig} from '../../../mommoo-library/handler/animation/keyframe/types';
import {AnimationType} from './main.types';
import {FrameAnimationConfig} from '../../../mommoo-library/handler/animation/request-frame/types';
import {RequestFrameAnimator} from '../../../mommoo-library/handler/animation/request-frame/request-frame-animator';
import {MainComponentLayoutDetector} from './main.component-layout-detector.service';

/**
 * This class provide specific animation easily that set as default config.
 *
 * The goal of this class is use animation simply without knowing about complex animation config
 * So, animation API is can be need to simply two parameter 'animation type' and 'elementRef'
 * {@link startAnimation}
 *
 * The animation engine is css-keyframe-animation and js-request-frame-animation.
 * {@link KeyframeAnimator}, {@link RequestFrameAnimator}
 *
 * The animation type is can be seen at {@link AnimationType}
 */
@Injectable()
export class MainCommonAnimator implements OnDestroy {
  private static readonly fadeInAnimationName = 'common-fade-in-keyframe-animation';
  private static readonly frameAnimationConfig: FrameAnimationConfig = {
    duration: 500,
    easing: 'easeInOutCubic'
  };
  private static readonly keyframeAnimationConfig: KeyframeAnimationConfig = {
    duration: '400ms',
    timingFunction: 'ease-in-out',
    fillMode: 'forwards'
  };

  private keyframeAnimator = new KeyframeAnimator();
  private readonly requestFrameAnimator = new RequestFrameAnimator(MainCommonAnimator.frameAnimationConfig);

  public constructor(private mainComponentLayoutDetector: MainComponentLayoutDetector) {
    this.keyframeAnimator.addKeyframe(MainCommonAnimator.createFadeInAnimationKeyframe());
  }

  private static createFadeInAnimationKeyframe(): AnimationKeyframe {
    return {
      animationName: MainCommonAnimator.fadeInAnimationName,
      commonConfig: this.keyframeAnimationConfig,
      keyframe: {
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        }
      }
    };
  }

  private scrollTo(elementRef: ElementRef<HTMLElement>) {
    const headerLayout = this.mainComponentLayoutDetector.getHeaderLayout();
    // if in collapsed header mode, the result of scrolling to element's position is overlapped by header
    // we want prevent overlapping contents
    const overlappedTop = headerLayout.isCollapseMode ? headerLayout.collapseHeaderHeight : 0;
    const extraTop = 10;
    const currentTop = window.pageYOffset;
    const elementTop = window.pageYOffset + Math.floor(elementRef.nativeElement.getBoundingClientRect().top);
    const destinationTop = elementTop - extraTop - overlappedTop;
    const moveDistance = destinationTop - currentTop;

    this.requestFrameAnimator.startAnimation(state => {
      const computeTop = currentTop + (state.progress * moveDistance);
      window.scrollTo(0, computeTop);
    });
  }

  public startAnimation(animationType: AnimationType, elementRef: ElementRef<HTMLElement>) {
    switch (animationType) {
      case AnimationType.FADE_IN:
        this.keyframeAnimator.startAnimation(MainCommonAnimator.fadeInAnimationName, elementRef);
        break;

      case AnimationType.SCROLL_TO:
        this.scrollTo(elementRef);
        break;
    }
  }

  public ngOnDestroy(): void {
    this.keyframeAnimator.removeKeyframe(MainCommonAnimator.fadeInAnimationName);
  }
}
