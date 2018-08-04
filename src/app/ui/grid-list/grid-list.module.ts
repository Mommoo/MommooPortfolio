import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MommooGridTile } from './grid-tile/grid-tile.component';
import { MommooGridList } from './grid-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    MommooGridTile, MommooGridList
  ],
  declarations: [MommooGridTile, MommooGridList]
})
export class MommooGridListModule { }
