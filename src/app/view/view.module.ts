import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from './header/header.module';
import {FooterModule} from './footer/footer.module';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {ContentsModule} from './contents/contents.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    ContentsModule,
    FooterModule
  ],
  exports: [
    HeaderModule,
    ContentsModule,
    FooterModule,
    ProjectDetailComponent
  ],
  declarations: [ProjectDetailComponent]
})
export class ViewModule {}
