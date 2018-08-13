export class StyleUtils {
  private static SCROLL_BAR_WIDTH;

  public static styledElement(element : HTMLElement, style : {}) : HTMLElement {
    Object.assign(element.style, style);
    return element;
  }

  public static styledElementByTagName(tagName : string , style : {}) : HTMLElement {
    return StyleUtils.styledElement(document.createElement(tagName), style);
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
    if ( StyleUtils.SCROLL_BAR_WIDTH === undefined ) {
      const outerDiv = this.styledElementByTagName('div', {
        visibility : 'hidden',
        width : '100px',
        msOverflowStyle : 'scrollbar',
        overflow : 'scroll'
      });

      document.body.appendChild(outerDiv);
      const widthWithScroll = outerDiv.offsetWidth;

      const innerDiv = this.styledElementByTagName('div', {
        width : '100%'
      });
      outerDiv.appendChild(innerDiv);
      const widthWithNoScroll = innerDiv.offsetWidth;

      document.body.removeChild(outerDiv);

      StyleUtils.SCROLL_BAR_WIDTH = widthWithScroll - widthWithNoScroll;
    }

    return StyleUtils.SCROLL_BAR_WIDTH;
  }
}
