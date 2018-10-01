import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooGridListModule} from './grid-list/grid-list.module';
import {MommooCardModule} from './card/card.module';
import {MommooMasonryModule} from './masonry-layout/mommoo-masonry.module';
import {MommooCommonModule} from './common/common.module';
import {MommooBannerModule} from './banner/banner.module';

@NgModule({
  imports: [
    CommonModule,
    MommooCommonModule,
    MommooGridListModule,
    MommooCardModule,
    MommooMasonryModule,
    MommooBannerModule
  ],
  exports : [
    MommooGridListModule,
    MommooCardModule,
    MommooMasonryModule,
    MommooBannerModule
  ],
  declarations: []
})
export class MommooUIModule { }
