import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MommooMasonryLayout } from './masonry-layout.component';
import { MommooMasonryTile } from './masonry-tile/masonry-tile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [MommooMasonryLayout, MommooMasonryTile],
  declarations: [MommooMasonryLayout, MommooMasonryTile]
})
export class MommooMasonryModule { }
