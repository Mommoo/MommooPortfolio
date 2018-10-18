import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContentsComponent} from './contents.component';
import {HomeModule} from './page/home/home.module';
import {ContentsRouteModule} from './contents.route.module';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
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
