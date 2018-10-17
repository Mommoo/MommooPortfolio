import {RippleAnimator} from './ripple-animator';
import {ElementRef, Injectable} from '@angular/core';
import {RippleRef, RippleState} from './ripple-types';
import {RippleDomFragment} from './ripple-dom-fragment';
import {RippleConfig} from './ripple-config';

@Injectable()
export class RippleRenderer {

  constructor(private hostElementRef: ElementRef<HTMLElement>,
              private rippleAnimator: RippleAnimator,
              private rippleConfig: RippleConfig){

  }

  public renderRippleFadeIn(triggerEvent: Event, pageX: number, pageY: number) : RippleRef {
    const rippleDomFragment = this.createRippleDomFragment(pageX, pageY);
    const rippleRef: RippleRef = {
      view: rippleDomFragment.rippleElement,
      triggerEvent: triggerEvent,
      executeFadeOutNextFadeIn: false,
      status: RippleState.NONE,
      destroy: ()=> rippleDomFragment.destroy()
    };
    this.rippleAnimator.startFadeIn(rippleRef);
    return rippleRef;
  }

  public renderRippleFadeOut(rippleRef: RippleRef) {
    this.rippleAnimator.startFadeOut(rippleRef);
  }

  public destroy() {
    this.rippleAnimator.destroy();
  }

  private createRippleDomFragment(pageX: number, pageY: number) {
    this.rippleConfig.container = this.hostElementRef.nativeElement;
    this.rippleConfig.positionX = pageX;
    this.rippleConfig.positionY = pageY;
    return new RippleDomFragment(this.rippleConfig);
  }
}
