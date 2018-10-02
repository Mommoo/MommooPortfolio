import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooBanner, MommooBannerSubtitle, MommooBannerTitle} from './banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [MommooBanner, MommooBannerTitle, MommooBannerSubtitle],
  declarations: [MommooBanner, MommooBannerTitle, MommooBannerSubtitle]
})
export class MommooBannerModule { }
