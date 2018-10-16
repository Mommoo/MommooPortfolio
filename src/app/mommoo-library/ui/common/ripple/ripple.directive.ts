import {Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RippleRenderer} from './ripple-renderer.service';
import {List} from '../../../data-structure/list/list';
import {RippleRef, RippleState} from './ripple-types';
import {RippleEventHandler} from './ripple-event-handler.service';
import {RippleAnimator} from './ripple-animator';
import {DomUtils} from '../../../util/dom';
import {RippleConfig} from './ripple-config';

@Directive({
  selector: '[mommooRipple]',
  providers: [RippleEventHandler, RippleRenderer, RippleAnimator, RippleConfig]
})
export class MommooRipple implements OnInit, OnDestroy, OnChanges {
  @Input()
  private rippleDone: ()=>void = DomUtils.emptyEventListener;

  @Input()
  private rippleColor: string = 'rgba(0,0,0,0.25)';

  @Input()
  private rippleFadeInDuration: number = 400;

  @Input()
  private rippleFadeOutDuration: number = 350;

  private activityRipples = new List<RippleRef>();

  constructor(private rippleRenderer: RippleRenderer,
              private rippleEventHandler: RippleEventHandler,
              private rippleConfig: RippleConfig) {

  }

  ngOnInit(): void {
    this.rippleEventHandler
      .setOnPressEventListener((pageX, pageY) => this.onPressEvent(pageX, pageY))
      .setOnReleaseEventListener(()=> this.onReleaseEvent())
      .setOnRippleDoneEventListener(rippleRef => this.onRippleDoneEvent(rippleRef));

    this.buildRippleConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildRippleConfig();
  }

  private buildRippleConfig() {
    this.rippleConfig.color = this.rippleColor;
    this.rippleConfig.fadeInDuration = this.rippleFadeInDuration;
    this.rippleConfig.fadeOutDuration = this.rippleFadeOutDuration;
  }

  private onPressEvent(pageX: number, pageY: number) {
    const rippleRef = this.rippleRenderer.renderRippleFadeIn(pageX, pageY);
    this.activityRipples.add(rippleRef);
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
    rippleRef.destroy();
    this.activityRipples.remove(rippleRef);
    this.rippleDone();
  }

  ngOnDestroy(): void {
    this.activityRipples.forEach(rippleRef => rippleRef.destroy());
    this.rippleEventHandler.destroy();
    this.rippleRenderer.destroy();
  }
}
