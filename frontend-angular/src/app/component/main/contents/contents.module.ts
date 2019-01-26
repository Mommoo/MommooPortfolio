import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicContentsModule} from './basic-contents/basic-contents.module';
import {ProjectContentsModule} from './project-contents/project-contents.module';
import {ContentsHistoryTacker} from './contents.history-tacker.service';

@NgModule({
  imports: [
    CommonModule,
    BasicContentsModule,
    ProjectContentsModule
  ],
  providers: [
    ContentsHistoryTacker
  ]
})
export class ContentsModule { }
