export class NumberUtils {
  public static isNumeric(str : string) {
    return !isNaN(Number(str));
  }
}
