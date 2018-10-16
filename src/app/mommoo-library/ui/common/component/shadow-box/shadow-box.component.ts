import {Component, Input} from '@angular/core';

@Component({
  selector: 'mommoo-shadow-box',
  templateUrl: './shadow-box.component.html',
  styleUrls: ['./shadow-box.component.scss']
})
export class MommooShadowBox {
  @Input()
  public radius : string = '0px';
}
