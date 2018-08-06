import {Component, Input} from '@angular/core';

@Component({
  selector: 'ui-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
  @Input() title : string;
  @Input() contentStyle;

  constructor() { }

}
