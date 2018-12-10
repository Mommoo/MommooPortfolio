import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {CardDimensionProp, CardLoadCompleteListener} from './types';
import {CardDomHandler} from './dom/card-dom-handler.service';
import {CardDimensionChecker} from './dom/card-dimension-checker.service';
import {MommooCardImage, MommooCardTitle, MommooCardViewport} from './card-contents.component';
import {DomUtils} from '../../util/dom';
import {ImageLoader} from '../../util/image-loader';

@Component({
  selector: 'mommoo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CardDomHandler, CardDimensionChecker],
  host: {
    class: 'mommoo-card'
  }
})
export class MommooCard implements OnChanges, AfterViewInit, OnInit {
  @Input() private cardWidth: string = CardDimensionProp.FIT;
  @Input() private cardHeight: string = CardDimensionProp.FIT;
  @Input() private cardContentsGutter = 10;

  private isFirstChanged = true;
  private cardLoadCompleteListeners: CardLoadCompleteListener[] = [];

  @ContentChild(MommooCardViewport, {read: ElementRef})
  private mommooCardViewport: ElementRef<HTMLElement>;

  @ContentChild(MommooCardImage)
  private mommooCardImage: MommooCardImage;

  @ContentChild(MommooCardImage, {read: ElementRef})
  private mommooCardImageElementRef: ElementRef<HTMLElement>;

  @ContentChild(MommooCardTitle, {read: ElementRef})
  private mommooCardTitle: ElementRef<HTMLElement>;

  public constructor(private cardDomHandler: CardDomHandler,
                     private cardDimensionChecker: CardDimensionChecker,
                     private hostElementRef: ElementRef<HTMLElement>,
                     private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.cardDimensionChecker.initialize(this.cardWidth, this.cardHeight);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.cardDimensionChecker.initialize(this.cardWidth, this.cardHeight);
    if (this.isFirstChanged) {
      this.isFirstChanged = false;
    } else {
      this.setStyles();
    }
  }

  public ngAfterViewInit(): void {
    this.setStyles();
  }

  public async setStyles() {
    this.setHostStyle();
    this.setCardTitleStyle();
    this.setCardViewportGiveGutterToContents();
    await this.setCardImageStyle();
    this.changeDetector.detectChanges();
    this.cardLoadCompleteListeners.forEach(listener => listener());
  }

  private setHostStyle() {
    DomUtils.applyStyle(this.hostElementRef, this.cardDomHandler.getHostStyle());
  }

  private setCardTitleStyle() {
    if (this.mommooCardTitle) {
      DomUtils.applyStyle(this.mommooCardTitle, this.cardDomHandler.getTitleStyle());
    }
  }

  private setCardViewportGiveGutterToContents() {
    if (this.mommooCardViewport) {
      Array.from(this.mommooCardViewport.nativeElement.children)
        .slice(1)
        .map(element => <HTMLElement>element)
        .forEach(element => DomUtils.applyStyle(element, {marginTop: `${this.cardContentsGutter}px`}));
    }
  }

  private async setCardImageStyle() {
    const isNeedToStyle = this.mommooCardImage && this.cardDimensionChecker.isHeightWrap();
    if ( !isNeedToStyle ) {
      return;
    }

    try {
      const imagePath = this.mommooCardImage.imagePath;
      const imageDimension = await ImageLoader.promiseLoadImage(imagePath);
      // console.log(imageDimension.naturalWidth, imageDimension.naturalHeight);
      const imageStyle = this.cardDomHandler.getHeightWrapImageStyle(imageDimension.naturalWidth, imageDimension.naturalHeight);
      DomUtils.applyStyle(this.mommooCardImageElementRef, imageStyle);
    } catch {}
  }

  public addCardLoadCompleteListener(cardLoadCompleteListener: CardLoadCompleteListener) {
    this.cardLoadCompleteListeners.push(cardLoadCompleteListener);
  }
}
