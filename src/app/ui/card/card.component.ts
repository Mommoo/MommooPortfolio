import {
  AfterContentChecked,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2, SimpleChanges
} from '@angular/core';
import {InputValueChecker} from './Input-value-checker';
import {CardActionButtonProperty, InputDimenType} from './data-type';
import {CardStyleComputer} from './card-style-computer';

@Component({
  selector: 'mommoo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooCard implements OnChanges {

  /** wrap or fit or ratio(number) or fixed name(100px) */
  @Input() private cardWidth  : string = InputDimenType.FIT.name();
  @Input() private cardHeight : string = InputDimenType.FIT.name();
  @Input() cardBoxStyle : string = '';
  @Input() themeColor : string = 'green';
  @Input() cardTitle : string = '';
  @Input() cardTitleBoxStyle : string = '';
  @Input() cardImage : string = '';
  @Input() cardImageAnim : boolean = false;
  @Input() cardImageBoxStyle : string ='';
  @Input() hashTagMessages : Array<string>;
  @Input() hashTagBoxStyle : string = '';
  @Output() private actionEventEmitter : EventEmitter<string> = new EventEmitter();
  @Input() set actionButtonNames(names : Array<string>) {
    this.computeProps(names, 'name');
  }
  @Input() set actionButtonStyles(styles : Array<object>) {
    this.computeProps(styles, 'style');
  }

  public _actionButtonProps : Array<CardActionButtonProperty> = [];
  public _hashTagColor : string;
  public _imageStyle : {};
  public _cardShadowBoxStyle : {};

  constructor(private hostElementRef : ElementRef, private renderer : Renderer2, private cdr : ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ( new InputValueChecker(this.cardWidth, this.cardHeight).isNotValidate() ) {
      new Error(`dimen value you input is not fit the format[ "pair-ratio(1,1)" or "fix(100px)" or "fit" or "wrap"`);
    }

    const cardStyleComputer = new CardStyleComputer(this.cardWidth, this.cardHeight, this.cardImage, this.themeColor);
    cardStyleComputer.onReady(()=>{
      this._hashTagColor = cardStyleComputer.computeSubThemeColor();
      this._imageStyle   = cardStyleComputer.computeImageStyle();
      this._cardShadowBoxStyle = cardStyleComputer.computeShadowBoxStyle();
      this.applyStyleToHost(cardStyleComputer.computeRootBoxStyle());
      this.applyStyleToHost({visibility: 'visible'});
      this.cdr.detectChanges();
    })
    // this._hashTagColor = cardStyleComputer.computeSubThemeColor();
    // this._imageStyle   = cardStyleComputer.computeImageStyle();
    // this._cardShadowBoxStyle = cardStyleComputer.computeShadowBoxStyle();
    // this.applyStyleToHost(cardStyleComputer.computeRootBoxStyle());
    // this.applyStyleToHost({visibility: 'visible'});
  }

  public actionButtonClicks(buttonName) : void {
    this.actionEventEmitter.emit(buttonName);
  }

  private applyStyleToHost(CSSPropertyObject : {}) {
    Object
      .keys(CSSPropertyObject)
      .map(key=> ({name : key, value: CSSPropertyObject[key]}))
      .forEach(css => this.renderer.setStyle(this.hostElementRef.nativeElement, css.name, css.value))
  }

  private computeProps(props : Array<any>, propName : string) : void {
    const needToAppendSize = props.length - this._actionButtonProps.length;
    for ( let i = 0; i < needToAppendSize ; i ++ ) {
      this._actionButtonProps.push({
        name : '',
        style : {}
      })
    }
    props.forEach((value, index) => this._actionButtonProps[index][propName] = value);
  }
}
