import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {COMMON_COLOR} from '../common/mommoo-common';

@Component({
  selector: 'mommoo-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooBanner implements OnInit {
  @Input() public themeColor : string = COMMON_COLOR;
  @Input() public title : string;
  @Input() public subTitle : string;

  constructor() { }

  ngOnInit() {
  }

}
