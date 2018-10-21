import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentsComponent} from './contents.component';
import {HomeModule} from './page/home/home.module';
import {ContentsRouteModule} from './contents.route.module';
import {DetailProjectModule} from './page/detail-project/detail-project.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    DetailProjectModule,
    ContentsRouteModule
  ],
  exports: [
    HomeModule,
    ContentsComponent,
    ContentsRouteModule
  ],
  providers:[

  ],
  declarations: [
    ContentsComponent
  ]
})
export class ContentsModule{

}
