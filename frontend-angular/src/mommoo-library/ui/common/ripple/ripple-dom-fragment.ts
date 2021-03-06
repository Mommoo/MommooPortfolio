import {DomUtils} from '../../../util/dom';
import {RippleConfig} from './ripple-config';

export class RippleDomFragment{
  private readonly _rippleElement: HTMLElement;

  public constructor(private rippleConfig: RippleConfig) {
    this._rippleElement  = this.createRippleElement();
    const wrapper = this.createRippleWrapper();
    wrapper.appendChild(this._rippleElement);
    this.rippleConfig.container.appendChild(wrapper);
  }

  public get rippleElement() {
    return this._rippleElement;
  }

  public destroy() {
    const wrapper = this._rippleElement.parentElement;
    wrapper.removeChild(this._rippleElement);
    wrapper.parentElement.removeChild(wrapper);
  }

  private createRippleWrapper(): HTMLElement {
    const containerPosition = DomUtils.position(this.rippleConfig.container);
    return DomUtils.styledNewElement({
      width: `${containerPosition.width}px`,
      height: `${containerPosition.height}px`,
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0)',
      overflow: 'hidden',
      left: `0`,
      top: `0`,
      zIndex:'2',
      borderRadius: this.rippleConfig.radius,
      pointerEvents: 'none'
    });
  }
  private createRippleElement(): HTMLElement {
    const containerPosition = DomUtils.position(this.rippleConfig.container);
    const pageX = this.rippleConfig.positionX;
    const pageY = this.rippleConfig.positionY;

    const x = pageX - containerPosition.left - pageXOffset;
    const y = pageY - containerPosition.top - pageYOffset;
    const radius = RippleDomFragment.distanceToFurthestAtCorner(x, y, containerPosition.width, containerPosition.height);
    const size = `${radius *2}px`;
    return DomUtils.styledNewElement({
      width: size,
      height: size,
      position: 'absolute',
      backgroundColor: this.rippleConfig.color,
      left: `-${radius - x}px`,
      top: `-${radius - y}px`,
      zIndex:2,
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
