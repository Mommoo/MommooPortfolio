import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectContentsComponent } from './project-contents.component';
import { ImageBannerComponent } from './image-banner/image-banner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ProjectContentsComponent],
  declarations: [ProjectContentsComponent, ImageBannerComponent]
})
export class ProjectContentsModule { }
