import {NumberUtils} from '../common/NumberUtils';

export class InputDimenType {
  public static readonly RATIO : InputDimenType = new InputDimenType("ratio");
  public static readonly FIX   : InputDimenType = new InputDimenType("fix");
  public static readonly FIT   : InputDimenType = new InputDimenType("fit");
  public static readonly WRAP  : InputDimenType = new InputDimenType("wrap");

  private static readonly literal_values = [InputDimenType.FIT, InputDimenType.WRAP];

  private constructor(private _name : string) {}

  public name() : string {
    return this._name;
  }

  private static isFixValue(str : string) : boolean {
    return str.substring(str.length -2, str.length) === 'px' && NumberUtils.isNumeric(str.substring(0, str.length -2));
  }

  public static isTypeOf(value : string) : InputDimenType {
    if ( NumberUtils.isNumeric(value) ) {
      return InputDimenType.RATIO;
    }

    if ( this.isFixValue(value) ) {
      return InputDimenType.FIX;
    }

    const foundLiteralResult = this.literal_values.find(_value => _value.name() === value);

    if ( foundLiteralResult === undefined ) {
      new Error(`not exist this name of "${value}"`);
    } else {
      return foundLiteralResult;
    }
  }
}
