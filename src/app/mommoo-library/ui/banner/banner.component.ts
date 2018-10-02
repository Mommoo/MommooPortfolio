import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'mommoo-banner',
  template: '<ng-content></ng-content>',
  styleUrls: ['./banner.component.scss'],
  host : {'id' : 'banner'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooBanner {}

@Component({
  selector: 'mommoo-banner-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host : {'id' : 'banner-title'}
})
export class MommooBannerTitle {}

@Component({
  selector: 'mommoo-banner-sub-title',
  template: '<ng-content></ng-content>',
  styleUrls: ['./banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host : {
    id : 'banner-sub-title'
  }
})
export class MommooBannerSubtitle {}
