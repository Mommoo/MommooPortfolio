import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooCard} from './card.component';
import {MommooActionView} from './action-view/action-view.component';
import {MommooCardImage} from './card-image-view/card-image.component';
import {MommooHashTagView} from './hash-tag-view/hash-tag-view.component';
import {MommooCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    MommooCommonModule
  ],
  exports : [
    MommooCard
  ],
  providers : [],
  declarations: [MommooCard, MommooActionView, MommooCardImage, MommooHashTagView]
})
export class MommooCardModule { }
