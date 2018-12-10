import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'mommoo-list-section',
  template: `<div id="section-title">{{sectionTitle}}</div>
             <div id="section-content"><ng-content></ng-content></div>`,
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host : {
    class : 'list-section'
  }
})
export class MommooListSection implements OnInit {
  @Input()
  public sectionTitle : string;

  constructor() { }

  ngOnInit() {
  }

}
