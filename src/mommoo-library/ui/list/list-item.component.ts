import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mommoo-list-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host : {
    id : 'list-item'
  }
})
export class MommooListItem implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
