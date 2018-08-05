export class StyleUtils {
  public static styledElement(element : HTMLElement, style : {}) : HTMLElement {
    Object.assign(element.style, style);
    return element;
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
}
