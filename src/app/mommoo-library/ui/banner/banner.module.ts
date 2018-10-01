import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooBanner} from './banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [MommooBanner],
  declarations: [MommooBanner]
})
export class MommooBannerModule { }
