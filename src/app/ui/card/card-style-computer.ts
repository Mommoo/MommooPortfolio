import {StyleUtils} from '../common/style/StyleUtils';
import {InputValueChecker} from './Input-value-checker';
import {InputDimenType} from './data-type';

export class CardStyleComputer {
  private inputValueChecker : InputValueChecker;
  private readyListener = () => {};
  private ratio : number = -1;

  public constructor(private cardWidth, private cardHeight, private cardImage, private themeColor) {
    this.inputValueChecker = new InputValueChecker(this.cardWidth, this.cardHeight);
    const imgO = new Image();
    imgO.src = this.cardImage;
    imgO.onload = ()=> {
      this.ratio = 100 * imgO.height / imgO.width;
      this.readyListener();
    }
  }

  public onReady(fn : ()=>void) {
    if ( this.ratio !== -1 ) {
      fn();
    } else {
      this.readyListener = fn;
    }
  }

  public computeSubThemeColor() : string {
    const rgba : number[] = StyleUtils.colorToRGBA(this.themeColor);
    return `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${0.7*rgba[3]/255})`;
  }

  public computeRootBoxStyle() : {} {
    const hostStyle = {};
    if ( this.inputValueChecker.isPairRatioValue() ) {
      Object.assign(hostStyle, this.computeRootBoxStyleByRatio())
    } else {
      Object.assign(hostStyle, this.computeRootBoxStyleExceptRatio());
      hostStyle['display'] = this.inputValueChecker.isWidthWrapValue() ? 'table' : 'block';
    }

    return hostStyle;
  }

  private computeRootBoxStyleByRatio() : {} {
    const intWidthRatio  = parseInt(this.cardWidth);
    const intHeightRatio = parseInt(this.cardHeight);
    return {
      width : '100%',
      paddingBottom : `${intHeightRatio * 100 / intWidthRatio}%`
    }
  }

  private computeRootBoxStyleExceptRatio() : {} {
    const convertStyleProperty = value => {
      switch( InputDimenType.isTypeOf(value) ){
        case InputDimenType.FIX :
          return value;
        case InputDimenType.WRAP :
          return 'auto';
        case InputDimenType.FIT :
          return '100%';
        default :
          return value;
      }
    };

    return {
      width : convertStyleProperty(this.cardWidth),
      height : convertStyleProperty(this.cardHeight)
    }
  }

  public computeShadowBoxStyle() : {} {
    const anyoneWrap : boolean = this.inputValueChecker.isHeightWrapValue() || this.inputValueChecker.isWidthWrapValue();
    return {
      position : anyoneWrap ? "static" : "absolute"
    }
  }

  public computeImageStyle() : {} {
    return {
      paddingBottom : this.inputValueChecker.isHeightWrapValue() ? `${this.ratio}%` : ''
    }
  }
}
