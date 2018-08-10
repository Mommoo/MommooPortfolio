import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';

@Component({
  selector: 'mommoo-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardImage {

  @Input() imageStyle: string;
  @Input() isAnimate: boolean = false;
  @Input() imagePath : string;
  @ViewChild('cardImage') cardImage: ElementRef;

  private animationPlayer: AnimationPlayer;

  constructor(private animBuilder: AnimationBuilder) {}

  @HostListener('mouseenter')
  private onMouseEnter() {
    this.playAnimation(1.5, 'ease-in');
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    this.playAnimation(1, 'ease-out');
  }

  private playAnimation(toScale: number, interpolate : string) {
    if ( !this.isAnimate ) {
      return;
    }

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
