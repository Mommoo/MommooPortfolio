import {Injectable} from '@angular/core';
import {CardDimensionProp} from '../types';
import {CardDimensionChecker} from './card-dimension-checker.service';
import {DomCSSStyle} from '../../../util/types';

@Injectable()
export class CardDomHandler {
  public constructor(private cardDimensionChecker: CardDimensionChecker) {

  }

  public getHostStyle(): DomCSSStyle {
    const cardWidth = this.cardDimensionChecker.cardWidth;
    const cardHeight = this.cardDimensionChecker.cardHeight;
    const commonStyle = {visibility: 'visible'};
    if (this.cardDimensionChecker.isBothRatio()) {
      return {
        ...commonStyle,
        ...CardDomHandler.computeRootBoxStyleByRatio(cardWidth, cardHeight)
      }
    } else {
      return {
        ...commonStyle,
        ...CardDomHandler.computeRootBoxStyleExceptRatio(cardWidth, cardHeight),
        display: this.cardDimensionChecker.isWidthWrap() ? 'table' : 'block'
      }
    }
  }

  private static computeRootBoxStyleByRatio(cardW: string, cardH: string): object {
    const intWidthRatio = parseInt(cardW);
    const intHeightRatio = parseInt(cardH);
    return {
      width: '100%',
      paddingBottom: `${intHeightRatio * 100 / intWidthRatio}%`
    };
  }

  private static computeRootBoxStyleExceptRatio(cardW: string, cardH: string): object {
    const convertStyleProperty = value => {
      switch (value) {
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
      width: convertStyleProperty(cardW),
      height: convertStyleProperty(cardH)
    };
  }

  //cross-browser
  public getTitleStyle(): DomCSSStyle {
    if (!this.cardDimensionChecker.isWidthWrap()) {
      return {
        wordBreak: 'break-word',
        wordWrap: 'break-word',
        whiteSpace: 'normal'
      }
    } else {
      return {
        wordBreak: 'keep-all',
        wordWrap: 'keep-all',
        whiteSpace: 'nowrap'
      }
    }
  }

  public getHeightWrapImageStyle(naturalWidth: number, naturalHeight: number): DomCSSStyle {
    if ( this.cardDimensionChecker.isHeightWrap() ) {
      if (this.cardDimensionChecker.isWidthWrap() ) {
        return {
          width: `${naturalWidth}px`,
          height: `${naturalHeight}px`
        }
      } else {
        const ratio = naturalHeight / naturalWidth;
        return {
          paddingBottom: `${ratio * 100}%`
        }
      }
    }
  }
}
