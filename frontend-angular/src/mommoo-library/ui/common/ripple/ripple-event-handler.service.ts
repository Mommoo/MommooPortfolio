import {ElementRef, Injectable} from '@angular/core';
import {OnPressEventListener, OnReleaseEventListener, onRippleDoneEventListener, OnTriggerEventListener, RippleRef} from './ripple-types';
import {DomUtils} from '../../../util/dom';

@Injectable()
export class RippleEventHandler{
  private eventMapper = new Map<string, any>();
  private isTouchStart = false;
  private onTriggerEventListener: OnTriggerEventListener = DomUtils.emptyEventListener;
  private onPressEventListener: OnPressEventListener = DomUtils.emptyEventListener;
  private onReleaseEventListener: OnReleaseEventListener = DomUtils.emptyEventListener;
  private onRippleDoneEventListener: onRippleDoneEventListener = DomUtils.emptyEventListener;

  public constructor(private hostElementRef: ElementRef<HTMLElement>){
    this.eventMapper
      .set('mousedown', event => this.onMouseDownEvent(event))
      .set('mouseup', () => this.onPointerUpEvent())
      .set('mouseleave', () => this.onPointerUpEvent())

      .set('touchstart', event => this.onTouchStartEvent(event))
      .set('touchend', () => this.onPointerUpEvent())
      .set('touchcancel', () => this.onPointerUpEvent());

    /** for promiseLoadImage element */
    setTimeout(()=>{
      this.eventMapper
        .forEach((event, eventName)=> this.hostElement().addEventListener(eventName, event))
    });
  }

  private hostElement(): HTMLElement {
    return this.hostElementRef.nativeElement;
  }

  private onMouseDownEvent(event: MouseEvent) {
    // event.preventDefault();
    //Some browsers fire mouse events after a `touchstart` event.
    if ( this.isTouchStart ) {
      return;
    }
    this.onTriggerEventListener(event);
    this.onPressEventListener(event.pageX, event.pageY);
  }

  private onTouchStartEvent(event: TouchEvent) {
    // event.preventDefault();
    this.isTouchStart = true;

    this.onTriggerEventListener(event);

    Array.from(event.changedTouches)
      .forEach(touch=> this.onPressEventListener(touch.pageX, touch.pageY));
  }

  private onPointerUpEvent() {
    this.onReleaseEventListener();
  }

  public setOnTriggerEventListener(onTriggerEventListener: OnTriggerEventListener) {
    this.onTriggerEventListener = onTriggerEventListener;
    return this;
  }

  public setOnPressEventListener(onPressEventListener: OnPressEventListener) {
    this.onPressEventListener = onPressEventListener;
    return this;
  }

  public setOnReleaseEventListener(onReleaseEventListener: OnReleaseEventListener) {
    this.onReleaseEventListener = onReleaseEventListener;
    return this;
  }

  public setOnRippleDoneEventListener(onRippleDoneEventListener: onRippleDoneEventListener) {
    this.onRippleDoneEventListener = onRippleDoneEventListener;
    return this;
  }

  public executeOnRippleDoneEvent(rippleRef: RippleRef) {
    this.onRippleDoneEventListener(rippleRef);
  }

  public destroy() {
    this.eventMapper
      .forEach((event, eventName)=> this.hostElement().removeEventListener(eventName, event))
  }
}
