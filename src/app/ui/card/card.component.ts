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
  @Input() themeColor : string = 'green';
  @Input() cardTitle : string = '';
  @Input() cardTitleBoxStyle : string = '';
  @Input() cardImage : string = '';
  @Input() cardImageBoxStyle : string ='';
  @Input() hashTagMessages : Array<string>;
  @Output() private actionEventEmitter : EventEmitter<string> = new EventEmitter();
  @Input() set actionButtonNames(names : Array<string>) {
    this.computeProps(names, 'name');
  }
  @Input() set actionButtonStyles(styles : Array<object>) {
    this.computeProps(styles, 'style');
  }

  public actionButtonProps : Array<CardActionButtonProperty> = [];
  public hashTagColor : string;
  public imageStyle : {};

  constructor(private hostElementRef : ElementRef, private renderer : Renderer2) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ( new InputValueChecker(this.cardWidth, this.cardHeight).isNotValidate() ) {
      new Error(`dimen value you input is not fit the format[ "pair-ratio(1,1)" or "fix(100px)" or "fit" or "wrap"`);
    }

    const cardStyleComputer = new CardStyleComputer(this.cardWidth, this.cardHeight, this.themeColor);
    this.hashTagColor = cardStyleComputer.computeSubThemeColor();
    this.imageStyle   = cardStyleComputer.computeImageStyle();
    this.applyStyleToHost(cardStyleComputer.computeRootBoxStyle());
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
    const needToAppendSize = props.length - this.actionButtonProps.length;
    for ( let i = 0; i < needToAppendSize ; i ++ ) {
      this.actionButtonProps.push({
        name : '',
        style : {}
      })
    }
    props.forEach((value, index) => this.actionButtonProps[index][propName] = value);
  }
}
