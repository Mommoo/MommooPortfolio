import {ElementRef, Injectable} from '@angular/core';
import {animate, AnimationBuilder, style} from '@angular/animations';

@Injectable()
export class CardImageAnimator {
  public constructor(private animationBuilder: AnimationBuilder) {

  }

  public scaleUp(elementRef: ElementRef<HTMLElement>) {
    this.startScaleAnimation(elementRef, 1.5, 'ease-in');
  }

  public scaleDown(elementRef: ElementRef<HTMLElement>) {
    this.startScaleAnimation(elementRef, 1, 'ease-out');
  }

  private startScaleAnimation(elementRef: ElementRef<HTMLElement>, scaleValue: number, easing: 'ease-in' | 'ease-out') {
    this.animationBuilder.build([
      animate(`300ms ${easing}`, style({transform: `scale(${scaleValue})`}))
    ]).create(elementRef.nativeElement)
      .play();
  }
}
