import {ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {CardImageAnimator} from './card-image-animator';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'mommoo-card-viewport',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mommoo-card-viewport'
  }
})
export class MommooCardViewport {}

@Component({
  selector: 'mommoo-card-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-title container'
  }
})
export class MommooCardTitle {}

@Component({
  selector: 'mommoo-card-image',
  template: `<div id="image-box" [style.background-image]="securityImageURL" #imageBox></div>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-image'
  }
})
export class MommooCardImage {
  private _imagePath;

  @Input()
  public set imagePath(imagePath: string) {
    this._imagePath = imagePath;
  }

  public get securityImageURL() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.imagePath})`);
  }

  public get imagePath() {
    return this._imagePath;
  }

  @Input()
  private animate = false;

  @ViewChild('imageBox', {read: ElementRef})
  private imageBox: ElementRef<HTMLElement>;

  constructor(private cardImageAnimator: CardImageAnimator, private sanitizer: DomSanitizer) {}

  @HostListener('mouseenter')
  private mouseEnter() {
    if ( this.animate ) {
      this.cardImageAnimator.scaleUp(this.imageBox);
    }
  }

  @HostListener('mouseleave')
  private mouseLeave() {
    if ( this.animate ) {
      this.cardImageAnimator.scaleDown(this.imageBox);
    }
  }
}

@Component({
  selector: 'mommoo-card-contents',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-contents'
  }
})
export class MommooCardContents {}

@Component({
  selector: 'mommoo-card-hashtag',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-hashtag'
  }
})
export class MommooCardHashTag {}

@Component({
  selector: 'mommoo-card-hashtag-contents',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-hashtag-contents'
  }
})
export class MommooCardHashTagContents {}

@Component({
  selector: 'mommoo-card-action',
  template: `<div id="divider"></div><div id="flex-row-box"><ng-content></ng-content></div>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-action'
  }
})
export class MommooCardAction {}

@Component({
  selector: 'mommoo-card-action-button',
  template: `<mommoo-button [flat]="true"><div id="button"><ng-content></ng-content></div></mommoo-button>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:'mommoo-card-action-button'
  }
})
export class MommooCardActionButton {}
