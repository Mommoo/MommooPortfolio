import {DomUtils} from '../../../util/dom';
import {RippleConfig} from './ripple-config';

export class RippleDomFragment{
  private readonly _wrapperElement: HTMLElement;
  private readonly _rippleElement: HTMLElement;

  public constructor(private rippleConfig: RippleConfig) {
    this._wrapperElement = this.createRippleWrapper();
    this._rippleElement  = this.createRippleElement();
    this._wrapperElement.appendChild(this.rippleElement);
    document.body.appendChild(this._wrapperElement);
  }

  public get rippleElement() {
    return this._rippleElement;
  }

  public destroy() {
    this._wrapperElement.removeChild(this._rippleElement);
    this._wrapperElement.parentElement.removeChild(this._wrapperElement);
  }

  private createRippleWrapper() : HTMLElement {
    const containerPosition = DomUtils.position(this.rippleConfig.container);
    return DomUtils.styledNewElement({
      left: `${containerPosition.left}px`,
      top: `${containerPosition.top}px`,
      width: `${containerPosition.width}px`,
      height: `${containerPosition.height}px`,
      overflow : 'hidden',
      position : 'absolute',
      zIndex : 99,
      backgroundColor : 'rgba(0,0,0,0)',
      pointerEvents: 'none'
    });
  }

  private createRippleElement(): HTMLElement {
    const containerPosition = DomUtils.position(this.rippleConfig.container);
    const pageX = this.rippleConfig.positionX;
    const pageY = this.rippleConfig.positionY;

    const x = pageX - containerPosition.left;
    const y = pageY - containerPosition.top;
    const radius = RippleDomFragment.distanceToFurthestAtCorner(x, y, containerPosition.width, containerPosition.height);
    const size = `${radius *2}px`;
    return DomUtils.styledNewElement({
      width: size,
      height: size,
      backgroundColor: this.rippleConfig.color,
      marginLeft: `-${radius - x}px`,
      marginTop: `-${radius - y}px`,
      borderRadius: '50%',
      pointerEvents: 'none'
    });
  }

  private static distanceToFurthestAtCorner(offsetX: number, offsetY: number, offsetWidth: number, offsetHeight: number) : number {
    const distanceX = offsetX > offsetWidth/2 ? offsetX : offsetWidth - offsetX;
    const distanceY = offsetY > offsetHeight/2 ? offsetY : offsetHeight - offsetY;
    const powDistanceX = Math.pow(distanceX, 2);
    const powDistanceY = Math.pow(distanceY, 2) ;
    return Math.sqrt(powDistanceX + powDistanceY);
  }
}
