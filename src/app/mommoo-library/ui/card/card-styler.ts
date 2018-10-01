import {CardDimensionChecker} from './card-dimension-checker';
import {CardDimensionProp, ImageLoadStatus} from './types';
import {StyleUtils} from '../../util/style';

export class CardStyler {
  private cardDimensionChecker: CardDimensionChecker = new CardDimensionChecker();

  public init(cardW: string, cardH: string, imagePath: string, themeColor: string) {
    this.cardDimensionChecker.init(cardW, cardH);

    if (!this.cardDimensionChecker.isValidate()) {
      throw new Error(`dimen value you input is not fit the format[ "pair-ratio(1,1)" or "fix(100px)" or "fit" or "wrap"`);
    }
    const self = this;
    return new Promise<StyleComputer>((resolve => self.imageLoad(imagePath, (imageLoadStatus, imageSizeRatio) => {
      const styleComputer = new StyleComputer(cardW, cardH, imageSizeRatio, themeColor, this.cardDimensionChecker, imageLoadStatus);
      resolve(styleComputer);
    })));
  }

  private imageLoad(imagePath: string, callback: (imageLoadStatus : ImageLoadStatus, imageSizeRatio : number)=>void) {
    const imgO = new Image();
    imgO.src = imagePath;
    imgO.onload = imgO.onerror = event => {
      const isLoadEvent = event.type === 'load';
      const imageSizeRatio  = isLoadEvent ? 100 * imgO.height / imgO.width : -1;
      const imageLoadStatus = isLoadEvent ? ImageLoadStatus.SUCCESS : ImageLoadStatus.FAIL;
      callback(imageLoadStatus, imageSizeRatio);
    };
  }
}

export class StyleComputer {
  public constructor(private cardW: string,
                     private cardH: string,
                     private imageSizeRatio: number,
                     private themeColor: string,
                     private cardDimensionChecker,
                     private imageLoadStatus : ImageLoadStatus) {

  }

  public computeSubThemeColor() : string {
    const rgba : number[] = StyleUtils.colorToRGBA(this.themeColor);
    return `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${0.7*rgba[3]/255})`;
  }

  public computeRootBoxStyle() : object {
    const rootStyle = {visibility : 'visible'};
    if ( this.cardDimensionChecker.isBothRatio() ) {
      Object.assign(rootStyle, this.computeRootBoxStyleByRatio())
    } else {
      Object.assign(rootStyle, this.computeRootBoxStyleExceptRatio());
      const isWidthWrap = this.cardDimensionChecker.isWidthWrap();
      rootStyle['display'] = isWidthWrap ? 'table' : 'block';
    }
    return rootStyle;
  }

  private computeRootBoxStyleByRatio() : object {
    const intWidthRatio  = parseInt(this.cardW);
    const intHeightRatio = parseInt(this.cardH);
    return {
      width : '100%',
      paddingBottom : `${intHeightRatio * 100 / intWidthRatio}%`
    };
  }

  private computeRootBoxStyleExceptRatio() : object {
    const convertStyleProperty = value => {
      switch( value ){
        case CardDimensionProp.FIX :
          return value;
        case CardDimensionProp.WRAP :
          return 'auto';
        case CardDimensionProp.FIT :
          return '100%';
        default :
          return value;
      }
    };

    return {
      width  : convertStyleProperty(this.cardW),
      height : convertStyleProperty(this.cardH)
    }
  }

  public computeShadowBoxStyle() : object {
    const anyoneWrap = this.cardDimensionChecker.isAnyoneWrap();
    return {
      position : anyoneWrap ? "static" : "absolute"
    }
  }

  public computeImageStyle() : object {
    const defaultStyle = {paddingBottom : ''};
    if ( !this.cardDimensionChecker.isHeightWrap() ) {
      return defaultStyle;
    }

    switch(this.imageLoadStatus) {
      case ImageLoadStatus.FAIL :
        return defaultStyle;
      case ImageLoadStatus.SUCCESS :
        return {paddingBottom : `${this.imageSizeRatio}%`}
      default :
        return defaultStyle;
    }
  }
}
