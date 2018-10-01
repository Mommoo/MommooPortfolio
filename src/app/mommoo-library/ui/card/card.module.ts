import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooCard} from './card.component';
import {MommooActionView} from './child-view/action-view/action-view.component';
import {MommooCardImage} from './child-view/card-image/card-image.component';
import {MommooHashTagView} from './child-view/hash-tag-view/hash-tag-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    MommooCard
  ],
  providers : [],
  declarations: [MommooCard, MommooActionView, MommooCardImage, MommooHashTagView]
})
export class MommooCardModule { }
