import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooCard} from './card.component';
import {MommooHashTag} from './hash-tag/hash-tag.component';
import {MommooActionView} from './action-view/action-view.component';
import { MommooCardImage } from './card-image/card-image.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    MommooCard
  ],
  declarations: [MommooCard, MommooHashTag, MommooActionView, MommooCardImage]
})
export class MommooCardModule { }
