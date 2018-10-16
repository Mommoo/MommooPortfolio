import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooGridListModule} from './grid-list/grid-list.module';
import {MommooCardModule} from './card/card.module';
import {MommooMasonryModule} from './masonry-layout/mommoo-masonry.module';
import {MommooCommonModule} from './common/common.module';
import {MommooBannerModule} from './banner/banner.module';
import { MommooList } from './list/list.component';
import {MommooListModule} from './list/list.module';
import {MommooButtonModule} from './button/button.module';

const UI_MODULE_LIST = [
  MommooGridListModule,
  MommooCardModule,
  MommooMasonryModule,
  MommooBannerModule,
  MommooListModule,
  MommooButtonModule
];

@NgModule({
  imports: UI_MODULE_LIST,
  exports : UI_MODULE_LIST
})
export class MommooUIModule { }
