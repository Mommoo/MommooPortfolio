import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'mommoo-list-title',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host : {
    class : 'list-title'
  }
})
export class MommooListTitle implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
