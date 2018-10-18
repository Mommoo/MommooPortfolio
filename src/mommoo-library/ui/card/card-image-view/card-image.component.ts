import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';

@Component({
  selector: 'mommoo-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardImage {

  @Input() imageStyle: string;
  @Input() imagePath : string;
  @ViewChild('cardImage') cardImage: ElementRef;

  private animationPlayer: AnimationPlayer;

  private hoverEvent = (event : Event) => {
    if ( event.type === 'mouseenter' ) {
      this.playAnimation(1.5, 'ease-in');
      return;
    }

    if ( event.type === 'mouseleave' ) {
      this.playAnimation(1, 'ease-out');
      return;
    }
  };

  constructor(private animBuilder: AnimationBuilder, private hostElement : ElementRef) {
    this.isAnimate = false;
  }

  private nativeElement() : HTMLElement {
    return this.hostElement.nativeElement;
  }

  @Input() set isAnimate(isAnim : boolean) {
    ['mouseenter', 'mouseleave'].forEach(eventName =>{
      if ( isAnim ){
        this.nativeElement().addEventListener(eventName, this.hoverEvent);
      } else {
        this.nativeElement().removeEventListener(eventName, this.hoverEvent);
      }
    });
  }

  private playAnimation(toScale: number, interpolate : string) {
    if ( this.animationPlayer ) {
      this.animationPlayer.pause();
    }

    this.animationPlayer = this.animBuilder
      .build([
        animate(`300ms ${interpolate}`, style({transform : `scale(${toScale})`}))
      ]).create(this.cardImage.nativeElement);
    this.animationPlayer.play();
  }
}
