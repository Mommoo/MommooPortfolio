import {ElementRef} from '@angular/core';
import {emptyBounds, Bounds, DomCSSStyle} from './types';

export class DomUtils {
  private static SCROLL_BAR_WIDTH;

  public static emptyEventListener: () => void = () => {};

  public static applyStyle(target: HTMLElement | ElementRef<HTMLElement>, style: DomCSSStyle): HTMLElement {
    const element = DomUtils.takeElementIfWrappedRef(target);
    Object.assign(element.style, style);
    return element;
  }

  public static styledNewElement(style: DomCSSStyle, elemName?: string): HTMLElement;

  public static styledNewElement(style: DomCSSStyle, elemName: string = 'div'): HTMLElement {
    const element: HTMLElement = document.createElement(elemName);
    return this.applyStyle(element, style);
  }

  public static colorToRGBA(color: string): [number, number, number, number] {
    const cvs = document.createElement('canvas');
    cvs.width = 1;
    cvs.height = 1;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const uInt8ClampedArray: Uint8ClampedArray = ctx.getImageData(0, 0, 1, 1).data;
    return [uInt8ClampedArray[0], uInt8ClampedArray[1], uInt8ClampedArray[2], uInt8ClampedArray[3]];
  }

  public static getScrollbarWidth(): number {
    if ( DomUtils.SCROLL_BAR_WIDTH === undefined ) {
      const outerDiv = this.styledNewElement({
        visibility : 'hidden',
        width : '100px',
        msOverflowStyle : 'scrollbar',
        overflow : 'scroll'
      });

      document.body.appendChild(outerDiv);
      const widthWithScroll = outerDiv.offsetWidth;

      const innerDiv = this.styledNewElement({width : '100%'});
      outerDiv.appendChild(innerDiv);
      const widthWithNoScroll = innerDiv.offsetWidth;

      document.body.removeChild(outerDiv);

      DomUtils.SCROLL_BAR_WIDTH = widthWithScroll - widthWithNoScroll;
    }

    return DomUtils.SCROLL_BAR_WIDTH;
  }

  public static append(to: ElementRef<HTMLElement>, from: ElementRef<HTMLElement>) {
    to.nativeElement.appendChild(from.nativeElement);
  }

  public static indexOf(target: ElementRef<HTMLElement>, parent?: ElementRef<HTMLElement>): number {
    const nativeParentElement = parent === undefined ? target.nativeElement.parentElement : parent.nativeElement;
    const nativeTargetElement = target.nativeElement;
    return Array.from(nativeParentElement.children)
      .findIndex(element => element === nativeTargetElement);
  }

  public static move(target: ElementRef<HTMLElement>, toIndex: number, parent?: ElementRef<HTMLElement>) {
    const nativeParentElement = parent === undefined ? target.nativeElement.parentElement : parent.nativeElement;
    const nativeTargetElement = target.nativeElement;
    const children = nativeParentElement.children;
    const size = children.length;

    const fragment = document.createDocumentFragment();
    for ( let i = 0 ; i < size ; i++ ) {
      if ( toIndex === i ) {
        fragment.appendChild(nativeTargetElement);
        i++;
      }
      fragment.appendChild(children[0]);
    }
    nativeParentElement.appendChild(fragment);
  }

  public static clearChildren(element: HTMLElement);

  public static clearChildren(elementRef: ElementRef<HTMLElement>);

  public static clearChildren(target: HTMLElement | ElementRef<HTMLElement>) {
    const element = this.takeElementIfWrappedRef(target);
    if ( element ) {
      Array.from(element.children).forEach(child => element.removeChild(child));
    }
  }

  public static parseElements<T>(type: T, fromElementRef: ElementRef<HTMLElement>): HTMLElement[];

  public static parseElements<T>(type: T, fromElement: HTMLElement): HTMLElement[];

  public static parseElements<T>(type: T, from: HTMLElement | ElementRef<HTMLElement>): HTMLElement[] {
    const fromElement = this.takeElementIfWrappedRef(from) || document.body;

    const tagName = (<any>type).__annotations__[0].selector;
    return Array.from(fromElement.getElementsByTagName(tagName));
  }

  public static position(element: HTMLElement): Bounds;

  public static position(elementRef: ElementRef<HTMLElement>): Bounds;

  public static position(target: ElementRef<HTMLElement> | HTMLElement): Bounds {
    if ( !target ) {
      return emptyBounds();
    }
    const element = DomUtils.takeElementIfWrappedRef(target);
    const clientRect = element.getBoundingClientRect();
    return DomUtils.createBounds(clientRect.width, clientRect.height, clientRect.left, clientRect.top);
  }

  public static offset(element: HTMLElement): Bounds;

  public static offset(elementRef: ElementRef<HTMLElement>): Bounds;

  public static offset(target: ElementRef<HTMLElement> | HTMLElement): Bounds {
    if ( !target ) {
      return emptyBounds();
    }
    const element = DomUtils.takeElementIfWrappedRef(target);
    const parentClientRect = element.parentElement.getBoundingClientRect();
    const elementClientRect = element.getBoundingClientRect();

    return DomUtils.createBounds(
      elementClientRect.width,
      elementClientRect.height,
      elementClientRect.left - parentClientRect.left,
      elementClientRect.top - parentClientRect.top);
  }

  private static createBounds(width, height, left, top): Bounds {
    return {
      width,
      height,
      left,
      top,
      right : left + width,
      bottom : top + height
    };
  }

  public static takeElementIfWrappedRef(target: ElementRef<HTMLElement> | HTMLElement) {
    if ( target instanceof ElementRef ) {
      return target.nativeElement;
    }

    return target;
  }
}
