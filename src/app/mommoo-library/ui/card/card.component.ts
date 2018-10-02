import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {CardStyler} from './card-styler';
import {CardDimensionProp} from './types';

@Component({
  selector: 'mommoo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooCard implements OnChanges {
  @Input() private cardWidth  : string = CardDimensionProp.FIT;
  @Input() private cardHeight : string = CardDimensionProp.FIT;
  @Input() public cardBoxStyle : object;
  @Input() public themeColor : string = 'green';
  @Input() public cardTitle : string;
  @Input() public cardTitleBoxStyle : object;
  @Input() public cardImagePath : string;
  @Input() public cardImageAnim : boolean = false;
  @Input() public cardImageBoxStyle : object;
  @Input() public hashTagMessages : Array<string>;
  @Input() public hashTagMessageStyles : object[];
  @Input() public hashTagBoxStyle : object;
  @Input() public actionButtonNames  : string[];
  @Input() public actionButtonStyles : object[];
  @Output() private actionEventEmitter : EventEmitter<string> = new EventEmitter();

  public _subThemeColor : string;
  public _imageStyle : object;
  public _cardShadowBoxStyle : object;

  private cardStyler = new CardStyler();
  private _imageOnLoadListener = ()=>{};

  constructor(private hostElementRef : ElementRef, private renderer : Renderer2, private cdr : ChangeDetectorRef) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    const self = this;
    this.cardStyler
      .init(this.cardWidth, this.cardHeight, this.cardImagePath, this.themeColor)
      .then(styleComputer => {
        self.applyStyleToHost(styleComputer.computeRootBoxStyle());
        self._cardShadowBoxStyle = styleComputer.computeShadowBoxStyle();
        self._subThemeColor = styleComputer.computeSubThemeColor();
        self._imageStyle = styleComputer.computeImageStyle();
        self.cdr.detectChanges();
        self._imageOnLoadListener();
      });
  }

  public actionButtonClicks(buttonName) : void {
    this.actionEventEmitter.emit(buttonName);
  }

  private applyStyleToHost(CSSProps : {}) {
    Object
      .entries(CSSProps)
      .forEach(entry => this.renderer.setStyle(this.hostElementRef.nativeElement, entry[0], entry[1]));
  }

  /** to checking for card-load-checker.service */
  private _watchImageLoaded(onLoadListener : ()=>void) {
    this._imageOnLoadListener = onLoadListener;
  }
}
