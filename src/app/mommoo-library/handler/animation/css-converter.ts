import {KeyFrames} from './types';

export class CssConverter {
  private static readonly UPPERCASE_PATTERN = /[A-Z]/g;
  private static readonly MS_PATTERN = /^ms-/;
  private static readonly CACHE_MAP = new Map<string, string>();

  public static convertObjectToCSS(o : object) : string {
    const objectCssString = Object.keys(o)
      .map(key=> `${this.convertCamelToCss(key)}:${o[key]};`)
      .join("");

    return `{`+objectCssString+'}'
  }

  public static convertKeyFramesToCssString(keyFrames : KeyFrames) {
    const keyFrameCssString = Object.keys(keyFrames)
      .map(key => `${key}${this.convertObjectToCSS(keyFrames[key])}`)
      .join("");
    return `{${keyFrameCssString}}`;
  }

  private static convertCamelToCss(camelString : string) : string {
    if ( !this.CACHE_MAP.has(camelString) ) {
      const cssString = camelString
        .replace(this.UPPERCASE_PATTERN, '-$&')
        .toLowerCase()
        .replace(this.MS_PATTERN, '-ms-');

      this.CACHE_MAP.set(camelString, cssString);

      return cssString;
    }
    return this.CACHE_MAP.get(camelString);
  }
}
