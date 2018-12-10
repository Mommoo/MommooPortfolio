import {AnimationKeyframe, Keyframe, KeyframePrefix} from './types';

export class KeyframeStyleWriter {
  private static readonly UPPERCASE_PATTERN = /[A-Z]/g;
  private static readonly MS_PATTERN = /^ms-/;
  private static readonly CACHE_MAP = new Map<string, string>();

  private keyframeStyleElement: HTMLStyleElement;

  public writeKeyframes(animationKeyframes: AnimationKeyframe[]) {
    if (this.keyframeStyleElement === undefined) {
      this.keyframeStyleElement = document.createElement('style') as HTMLStyleElement;;
      this.keyframeStyleElement.type = 'text/css';
      document.head.appendChild(this.keyframeStyleElement);
    }

    this.keyframeStyleElement.innerHTML
      = KeyframeStyleWriter.convertToWholeVendorKeyframeCSSString(animationKeyframes);
  }

  public clear() {
    if (this.keyframeStyleElement && this.keyframeStyleElement.parentElement) {
      this.keyframeStyleElement.parentElement.removeChild(this.keyframeStyleElement);
    }
    this.keyframeStyleElement = null;
  }

  private static convertToWholeVendorKeyframeCSSString(animationKeyframes: AnimationKeyframe[]) {
    return animationKeyframes.map(animationKeyframe => {
      const keyFrameCSS = KeyframeStyleWriter.convertKeyframeToCssString(animationKeyframe.keyframe);
      /** vendor keyframe css strings */
      return KeyframePrefix
        .map(prefix => `${prefix}keyframes ${animationKeyframe.animationName}`)
        .map(keyframePrefix => `${keyframePrefix}${keyFrameCSS}`)
        .join('');
    }).join('');
  }

  private static convertObjectToCSS(o: object): string {
    const objectCssString = Object.keys(o)
      .map(key => `${this.convertCamelToCss(key)}:${o[key]};`)
      .join('');

    return `{` + objectCssString + '}';
  }

  private static convertKeyframeToCssString(keyFrame: Keyframe) {
    const keyFrameCssString = Object.keys(keyFrame)
      .map(key => `${key}${this.convertObjectToCSS(keyFrame[key])}`)
      .join('');
    return `{${keyFrameCssString}}`;
  }

  private static convertCamelToCss(camelString: string): string {
    if (!this.CACHE_MAP.has(camelString)) {
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
