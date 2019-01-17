import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectContentsComponent} from './project-contents.component';
import {ImageBannerComponent} from './image-banner/image-banner.component';
import { ProjectFeatureComponent } from './project-feature/project-feature.component';
import {YoutubeVideoComponent} from './youtube-video/youtube-video.component';
import { ProjectTemplateViewCreatorComponent } from './project-template-view-creator/project-template-view-creator.component';
import {MommooUIModule} from '../../../../../mommoo-library/ui/ui.module';
import { TextViewComponent } from './text-view/text-view.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports: [ProjectContentsComponent],
  declarations: [
    ImageBannerComponent,
    YoutubeVideoComponent,
    ProjectContentsComponent,
    ProjectFeatureComponent,
    ProjectTemplateViewCreatorComponent,
    TextViewComponent
  ]
})
export class ProjectContentsModule { }
