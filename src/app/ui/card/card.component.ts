import {AfterContentChecked, Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {InputValueChecker} from './Input-value-checker';
import {InputDimenType} from './data-type';

@Component({
  selector: 'mommoo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class MommooCard implements AfterContentChecked {

  /** wrap or fit or ratio(number) or fixed name(100px) */
  @Input() private cardWidth  : string = InputDimenType.FIT.name();
  @Input() private cardHeight : string = InputDimenType.FIT.name();

  private inputValueChecker : InputValueChecker;
  public boxStyle : {};

  constructor(private hostElementRef : ElementRef,
              private renderer : Renderer2) {

  }

  ngAfterContentChecked(): void {
    this.inputValueChecker = new InputValueChecker(this.cardWidth, this.cardHeight);
    if ( this.inputValueChecker.isNotValidate() ) {
      new Error(`dimen value you input is not fit the format[ "pair-ratio(1,1)" or "fix(100px)" or "fit" or "wrap"`);
    }
    this.setProperHostDimenStyle();
  }

  private setProperHostDimenStyle() {
    const hostCSSProperty = {};
    if ( this.inputValueChecker.isPairRatioValue() ) {
      const intWidth  = parseInt(this.cardWidth);
      const intHeight = parseInt(this.cardHeight);
      Object.assign(hostCSSProperty, MommooCard.computeHostStyleByRatio(intWidth, intHeight))
      this.boxStyle = {
        position : 'absolute',
        height : 'auto'
      }
    } else {
      Object.assign(hostCSSProperty, MommooCard.computeHostStyleExceptRatio(this.cardWidth, this.cardHeight));
      if ( this.inputValueChecker.isAnyoneWrapValue() ) {
        hostCSSProperty['display'] = this.inputValueChecker.isWidthWrapValue() ? 'table' : 'block';
        this.boxStyle = {
          position : 'static',
          height : '100%'
        };
      }
    }

    this.injectStylePropertyToHost(hostCSSProperty);
  }

  private injectStylePropertyToHost(CSSPropertyObject : {}) {
    Object
      .keys(CSSPropertyObject)
      .map(key=> ({name : key, value: CSSPropertyObject[key]}))
      .forEach(css => this.renderer.setStyle(this.hostElementRef.nativeElement, css.name, css.value))
  }

  private static computeHostStyleByRatio(widthRatio : number, heightRatio : number ) : {} {
    return {
      width : '100%',
      paddingBottom : `${heightRatio * 100 / widthRatio}%`
    }
  }

  private static computeHostStyleExceptRatio(widthNotRatio : string, heightNotRatio : string ) : {} {
    const convertStyleProperty = value => {
      switch( InputDimenType.isTypeOf(value) ){
        case InputDimenType.FIX :
          return value;
        case InputDimenType.WRAP :
          return 'auto';
        case InputDimenType.FIT :
          return '100%';
        default :
          return widthNotRatio;
      }
    };

    return {
      width : convertStyleProperty(widthNotRatio),
      height : convertStyleProperty(heightNotRatio)
    }
  }
}
