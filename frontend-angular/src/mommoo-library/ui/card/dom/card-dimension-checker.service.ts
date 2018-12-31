import {CardDimensionProp} from '../types';
import {NumberUtils} from '../../../util/number';
import {Injectable} from '@angular/core';

@Injectable()
export class CardDimensionChecker {
  private cardW: string;
  private cardH: string;
  private cardDimenProps : [CardDimensionProp, CardDimensionProp];

  public initialize(cardW: string, cardH: string){
    this.cardW = cardW;
    this.cardH = cardH;
    this.cardDimenProps = this.computeDimenProps(cardW, cardH);
  }

  public get cardWidth() {
    return this.cardW;
  }

  public get cardHeight() {
    return this.cardH;
  }

  private computeDimenProps(cardW: string, cardH): [CardDimensionProp, CardDimensionProp] {
    const dimensionProps: CardDimensionProp[] = [];
    [cardW, cardH].forEach(string => {
      if ( CardDimensionChecker.isFixedValue(string) ) {
        dimensionProps.push(CardDimensionProp.FIX);
      } else if ( string === CardDimensionProp.FIT ) {
        dimensionProps.push(CardDimensionProp.FIT);
      } else if ( string === CardDimensionProp.RATIO ) {
        dimensionProps.push(CardDimensionProp.RATIO);
      } else if ( string === CardDimensionProp.WRAP ) {
        dimensionProps.push(CardDimensionProp.WRAP);
      } else {
        dimensionProps.push(undefined);
      }
    });
    return [dimensionProps[0], dimensionProps[1]];
  }

  private static isFixedValue(stringValue: string): boolean {
    const length = stringValue.length;
    const value  = stringValue.substring(0, length - 2);
    const suffix = stringValue.substring(length - 2, length);

    return suffix === 'px' && NumberUtils.isNumeric(value);
  }

  private isAnyone(cardDimenProp: CardDimensionProp): boolean {
    return this.cardDimenProps.some(prop => prop === cardDimenProp);
  }

  private isAnyoneRatio(): boolean {
    return this.isAnyone(CardDimensionProp.RATIO);
  }

  public isAnyoneWrap(): boolean {
    return this.isAnyone(CardDimensionProp.WRAP);
  }

  public isWidthWrap(): boolean {
    return this.cardDimenProps[0] === CardDimensionProp.WRAP;
  }

  public isHeightWrap(): boolean {
    return this.cardDimenProps[1] === CardDimensionProp.WRAP;
  }

  private isBoth(cardDimenProp: CardDimensionProp): boolean {
    return this.cardDimenProps.every(prop => prop === cardDimenProp);
  }

  public isBothWrap(): boolean {
    return this.isBoth(CardDimensionProp.WRAP);
  }

  public isBothRatio(): boolean {
    return this.isBoth(CardDimensionProp.RATIO);
  }

  public isValidate() {
    const isProperDimenProps = this.cardDimenProps.every(prop => prop !== undefined);
    /** if card width or card height is ratio value, both card width and card height have to be set ratio value */
    const isProperConditionIfRatioMode = !this.isAnyoneRatio() || (this.isAnyoneRatio() && this.isBothRatio());

    return isProperDimenProps && isProperConditionIfRatioMode;
  }
}
