import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooBanner, MommooBannerTextContents, MommooBannerTitle} from './banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [MommooBanner, MommooBannerTitle, MommooBannerTextContents],
  declarations: [MommooBanner, MommooBannerTitle, MommooBannerTextContents]
})
export class MommooBannerModule { }
