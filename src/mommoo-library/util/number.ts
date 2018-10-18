export class NumberUtils {
  public static isNumeric(str : string) {
    return !isNaN(Number(str));
  }

  public static changePxToNumber(px : string, defaultNumber : number = 0) :number {
    const len = px.length;
    const parseNumber = px.substring(0,len-2);
    const parseSuffix = px.substring(len-2, len);
    if ( parseSuffix === 'px' && this.isNumeric(parseNumber) ) {
      return Number(parseNumber);
    }

    return defaultNumber;
  }
}
