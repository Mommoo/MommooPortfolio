export class StyleUtils {
  public static styledElement(element : HTMLElement, style : {}) : HTMLElement {
    Object.assign(element.style, style);
    return element;
  }
}
