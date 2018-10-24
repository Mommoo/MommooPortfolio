import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {RippleRenderer} from './ripple-renderer.service';
import {List} from '../../../data-structure/list/list';
import {RippleRef, RippleState} from './ripple-types';
import {RippleEventHandler} from './ripple-event-handler.service';
import {RippleAnimator} from './ripple-animator';
import {RippleConfig} from './ripple-config';
import {DomUtils} from '../../../util/dom';

@Directive({
  selector: '[mommooRipple]',
  providers: [RippleEventHandler, RippleRenderer, RippleAnimator, RippleConfig]
})
export class MommooRipple implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Output()
  private rippleDone: EventEmitter<Event> = new EventEmitter<Event>();

  @Input()
  private rippleColor: string = 'rgba(0,0,0,0.25)';

  @Input()
  private rippleRadius: string ='';

  @Input()
  private rippleFadeInDuration: number = 400;

  @Input()
  private rippleFadeOutDuration: number = 350;

  private activityRipples = new List<RippleRef>();
  private triggerEvent: Event;

  constructor(private rippleRenderer: RippleRenderer,
              private rippleEventHandler: RippleEventHandler,
              private rippleConfig: RippleConfig,
              private hostElementRef: ElementRef<HTMLElement>) {

  }

  ngOnInit(): void {
    this.rippleEventHandler
      .setOnTriggerEventListener(event => this.triggerEvent = event)
      .setOnPressEventListener((pageX, pageY) => this.onPressEvent(pageX, pageY))
      .setOnReleaseEventListener(()=> this.onReleaseEvent())
      .setOnRippleDoneEventListener(rippleRef => this.onRippleDoneEvent(rippleRef));

    this.buildRippleConfig();
  }

  public ngAfterViewInit(): void {
    this.setRippleContainerStyle();
  }

  /** ripple container have to be position 'relative' and  overflow 'hidden' */
  private setRippleContainerStyle() {
    DomUtils.applyStyle(this.hostElementRef, {
      position: 'relative',
      overflow: 'hidden'
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.buildRippleConfig();
  }

  private buildRippleConfig() {
    this.rippleConfig.color = this.rippleColor;
    this.rippleConfig.radius = this.rippleRadius;
    this.rippleConfig.fadeInDuration = this.rippleFadeInDuration;
    this.rippleConfig.fadeOutDuration = this.rippleFadeOutDuration;
  }

  private onPressEvent(pageX: number, pageY: number) {
    const rippleRef = this.rippleRenderer.renderRippleFadeIn(this.triggerEvent, pageX, pageY);
    this.activityRipples.add(rippleRef);
    this.triggerEvent = undefined;
  }

  private onReleaseEvent() {
    const cloneActivityRipples = this.activityRipples.values();
    cloneActivityRipples.forEach(rippleRef => {
      if ( rippleRef.status === RippleState.FADE_IN_START ) {
        rippleRef.executeFadeOutNextFadeIn = true;
      } else if ( rippleRef.status === RippleState.FADE_IN_END ) {
        this.rippleRenderer.renderRippleFadeOut(rippleRef);
      }
    });
  }

  private onRippleDoneEvent(rippleRef: RippleRef) {
    this.activityRipples.remove(rippleRef);
    this.rippleDone.emit(rippleRef.triggerEvent);
    rippleRef.destroy();
  }

  ngOnDestroy(): void {
    this.activityRipples.forEach(rippleRef => rippleRef.destroy());
    this.rippleEventHandler.destroy();
    this.rippleRenderer.destroy();
  }
}
