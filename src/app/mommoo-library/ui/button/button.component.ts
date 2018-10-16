import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';
import {NumberUtils} from '../../util/number';

@Component({
  selector: 'mommoo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooButton {
  private static readonly DEFAULT_SIZE = 12;
  public duration = 2000;
  @Input() public imgPath : string = '';
  @Input() public size : string = `${MommooButton.DEFAULT_SIZE}px`;

  constructor() { }

  public getImageSize() : string {
    const imgNumSize = NumberUtils.changePxToNumber(this.size, MommooButton.DEFAULT_SIZE) * 2;
    return `${imgNumSize}px`;
  }

  public onClick(){
    this.duration -= 500;
  }
}
