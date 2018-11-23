import {ElementRef, Injectable} from '@angular/core';
import {animate, AnimationBuilder, style} from '@angular/animations';
import {DomUtils} from '../../../../../mommoo-library/util/dom';
import {RequestFrameAnimator} from '../../../../../mommoo-library/handler/animation/request-frame/request-frame-animator';
import {FrameAnimationConfig} from '../../../../../mommoo-library/handler/animation/types';

@Injectable()
export class WindowScrollAnimator {
  private static readonly animationConfig: FrameAnimationConfig = {
    duration: 500,
    easing: 'easeInOutCubic'
  };
  private readonly requestFrameAnimator = new RequestFrameAnimator(WindowScrollAnimator.animationConfig);

  public scrollTo(targetElementRef: ElementRef<HTMLElement>, fromTop: number, toTop: number){
    const moveDistance = toTop - fromTop;

    this.requestFrameAnimator.startAnimation(state => {
      const computeTop = fromTop + ( state.progress * moveDistance );
      window.scrollTo(0, computeTop);
    });
  }
}
