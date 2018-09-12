import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ui-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class LabelComponent {

  @Input() title : string;
  @Input() markColor : string;

}
