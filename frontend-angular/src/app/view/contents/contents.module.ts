import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentsComponent} from './contents.component';
import {HomeModule} from './page/home/home.module';
import {PageRouteModule} from './route/page.route.module';
import {DetailProjectModule} from './page/detail-project/detail-project.module';
import { NotFoundPage } from './page/not-found/not-found.component';
import {MommooUIModule} from '../../../mommoo-library/ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    PageRouteModule,
    HomeModule,
    DetailProjectModule,
    MommooUIModule
  ],
  exports: [
    ContentsComponent
  ],
  declarations: [
    ContentsComponent,
    NotFoundPage
  ]
})
export class ContentsModule {
}
