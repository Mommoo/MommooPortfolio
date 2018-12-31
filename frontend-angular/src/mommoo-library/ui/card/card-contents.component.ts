import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import {CardImageAnimator} from './card-image-animator';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'mommoo-card-viewport',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardViewport {
  @HostBinding('class.mommoo-card-viewport') private classToggle = true;
}

@Component({
  selector: 'mommoo-card-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardTitle {
  @HostBinding('class.mommoo-card-title')
  @HostBinding('class.container')
  private classToggle = true;
}

@Component({
  selector: 'mommoo-card-image',
  template: `<div id="image-box" [style.background-image]="securityImageURL" #imageBox></div>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardImage {
  @HostBinding('class.mommoo-card-image') private classToggle = true;
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

  public constructor(private cardImageAnimator: CardImageAnimator, private sanitizer: DomSanitizer) {}

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardContents {
  @HostBinding('class.mommoo-card-contents') private classToggle = true;
}

@Component({
  selector: 'mommoo-card-hashtag',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardHashTag {
  @HostBinding('class.mommoo-card-hashtag') private classToggle = true;
}

@Component({
  selector: 'mommoo-card-hashtag-contents',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardHashTagContents {
  @HostBinding('class.mommoo-card-hashtag-contents') private classToggle = true;
}

@Component({
  selector: 'mommoo-card-action',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardAction {
  @HostBinding('class.mommoo-card-action') private classToggle = true;
}

@Component({
  selector: 'mommoo-card-action-button',
  template: `<mommoo-button [flat]="true"><div id="button"><ng-content></ng-content></div></mommoo-button>`,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooCardActionButton {
  @HostBinding('class.mommoo-card-action-button') private classToggle = true;
}
