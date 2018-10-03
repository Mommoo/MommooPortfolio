import {ElementRef} from '@angular/core';
import {Offsets} from './types';

export class DomUtils {
  private static SCROLL_BAR_WIDTH;

  public static applyStyle(target : HTMLElement | ElementRef, style : {}) : HTMLElement {
    if ( target instanceof ElementRef ) {
      return this.applyStyleFromRef(target, style);
    } else {
      return this.applyStyleFromElement(target, style);
    }
  }

  public static applyStyleFromRef(elementRef : ElementRef, style : {}) : HTMLElement {
    return this.applyStyleFromElement(elementRef.nativeElement, style);
  }

  public static applyStyleFromElement(element : HTMLElement, style : {} ) : HTMLElement {
    Object.assign(element.style, style);
    return element;
  }

  public static styledNewElement(elemName : string , style : {}) : HTMLElement {
    return this.applyStyleFromElement(document.createElement(elemName), style);
  }

  public static colorToRGBA(color : string) : [number, number, number, number] {
    const cvs = document.createElement('canvas');
    cvs.width = 1;
    cvs.height = 1;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const uInt8ClampedArray : Uint8ClampedArray = ctx.getImageData(0, 0, 1, 1).data;
    return [uInt8ClampedArray[0], uInt8ClampedArray[1], uInt8ClampedArray[2], uInt8ClampedArray[3]]
  }

  public static getScrollbarWidth() : number {
    if ( DomUtils.SCROLL_BAR_WIDTH === undefined ) {
      const outerDiv = this.styledNewElement('div', {
        visibility : 'hidden',
        width : '100px',
        msOverflowStyle : 'scrollbar',
        overflow : 'scroll'
      });

      document.body.appendChild(outerDiv);
      const widthWithScroll = outerDiv.offsetWidth;

      const innerDiv = this.styledNewElement('div', {width : '100%'});
      outerDiv.appendChild(innerDiv);
      const widthWithNoScroll = innerDiv.offsetWidth;

      document.body.removeChild(outerDiv);

      DomUtils.SCROLL_BAR_WIDTH = widthWithScroll - widthWithNoScroll;
    }

    return DomUtils.SCROLL_BAR_WIDTH;
  }

  public static append(to : ElementRef<HTMLElement>, from : ElementRef<HTMLElement>) {
    to.nativeElement.appendChild(from.nativeElement);
  }

  public static offset(elementRef : ElementRef<HTMLElement>) : Offsets {
    const htmlElement = elementRef.nativeElement;
    const width = htmlElement.offsetWidth;
    const height = htmlElement.offsetHeight;
    const left = htmlElement.offsetLeft;
    const top = htmlElement.offsetTop;
    return {
      width,
      height,
      left,
      top,
      right : left + width,
      bottom : top + height
    }
  }
}
