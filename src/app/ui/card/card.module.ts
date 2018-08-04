import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooCard} from './card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    MommooCard
  ],
  declarations: [MommooCard]
})
export class MommooCardModule { }
