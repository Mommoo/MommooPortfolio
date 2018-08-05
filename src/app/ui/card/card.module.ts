import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooCard} from './card.component';
import { MommooHashTag } from './hash-tag/hash-tag.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    MommooCard
  ],
  declarations: [MommooCard, MommooHashTag]
})
export class MommooCardModule { }
