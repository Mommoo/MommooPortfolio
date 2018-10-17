import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NumberUtils} from '../../util/number';

@Component({
  selector: 'mommoo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooButton {
  private static readonly DEFAULT_SIZE = 12;
  @Output() public rippleClick: EventEmitter<Event> = new EventEmitter();
  @Input() public imgPath : string = '';
  @Input() public size : string = `${MommooButton.DEFAULT_SIZE}px`;
  @Input() public flat: boolean = false;

  constructor() {

  }

  public onRippleClick(event: Event){
    this.rippleClick.emit(event);
  }

  public getImageSize() : string {
    const imgNumSize = NumberUtils.changePxToNumber(this.size, MommooButton.DEFAULT_SIZE) * 2;
    return `${imgNumSize}px`;
  }
}
