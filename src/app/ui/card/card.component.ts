import {AfterContentChecked, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2} from '@angular/core';
import {InputValueChecker} from './Input-value-checker';
import {InputDimenType} from './data-type';
import {CardStyleComputer} from './card-style-computer';

@Component({
  selector: 'mommoo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooCard implements AfterContentChecked {

  /** wrap or fit or ratio(number) or fixed name(100px) */
  @Input() private cardWidth  : string = InputDimenType.FIT.name();
  @Input() private cardHeight : string = InputDimenType.FIT.name();
  @Input() private themeColor : string = 'green';

  @Input() cardImage : string = '';
  @Input() cardImageBoxStyle : string ='';

  @Input() hashTagMessages : Array<string> = [];

  public hashTagColor : string;

  public imageStyle : {};

  constructor(private hostElementRef : ElementRef, private renderer : Renderer2) {}

  public ngAfterContentChecked(): void {
    console.log('card component ngAfterContentChecked!!');
    if ( new InputValueChecker(this.cardWidth, this.cardHeight).isNotValidate() ) {
      new Error(`dimen value you input is not fit the format[ "pair-ratio(1,1)" or "fix(100px)" or "fit" or "wrap"`);
    }

    const cardStyleComputer = new CardStyleComputer(this.cardWidth, this.cardHeight, this.themeColor);
    this.hashTagColor = cardStyleComputer.computeSubThemeColor();
    this.imageStyle   = cardStyleComputer.computeImageStyle();
    this.applyStyleToHost(cardStyleComputer.computeRootBoxStyle());
  }

  private applyStyleToHost(CSSPropertyObject : {}) {
    Object
      .keys(CSSPropertyObject)
      .map(key=> ({name : key, value: CSSPropertyObject[key]}))
      .forEach(css => this.renderer.setStyle(this.hostElementRef.nativeElement, css.name, css.value))
  }
}
