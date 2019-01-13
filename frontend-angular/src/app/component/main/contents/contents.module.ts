import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicContentsModule} from './basic-contents/basic-contents.module';
import {ProjectContentsModule} from './project-contents/project-contents.module';

@NgModule({
  imports: [
    CommonModule,
    BasicContentsModule,
    ProjectContentsModule
  ],
  declarations: []
})
export class ContentsModule { }
