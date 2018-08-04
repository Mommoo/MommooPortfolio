import {InputDimenType} from './data-type';
import {NumberUtils} from '../common/NumberUtils';


export class InputValueChecker{

  public constructor(private width: string,
                     private height : string){

  }

  private static isOneSideRatioValue(width : string, height : string) : boolean {
    return (!NumberUtils.isNumeric(width) && NumberUtils.isNumeric(height)) || (NumberUtils.isNumeric(width) && !NumberUtils.isNumeric(height));
  }

  private static validateType(values : Array<string>) : boolean {
    return values.every(value => {
      try {
        InputDimenType.isTypeOf(value);
        return true;
      } catch{
        return false;
      }
    });
  }

  public isPairRatioValue() : boolean {
    return NumberUtils.isNumeric(this.width) && NumberUtils.isNumeric(this.height);
  }

  public isAnyoneWrapValue() : boolean {
    return this.isWidthWrapValue() || this.isHeightWrapValue();
  }

  public isWidthWrapValue() : boolean {
    return InputValueChecker.isWrapValue(this.width);
  }

  public isHeightWrapValue() : boolean {
    return InputValueChecker.isWrapValue(this.height);
  }

  private static isWrapValue(value : string) : boolean {
    try {
      return InputDimenType.WRAP === InputDimenType.isTypeOf(value);
    } catch {
      return false;
    }
  }

  private isValidate() : boolean {
    if ( InputValueChecker.isOneSideRatioValue(this.width,this.height)){
      return false;
    }

    return this.isPairRatioValue() || InputValueChecker.validateType([this.width, this.height]);
  }

  public isNotValidate() : boolean {
    return !this.isValidate();
  }
}
