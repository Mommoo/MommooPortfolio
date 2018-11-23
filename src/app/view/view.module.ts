import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from './header/header.module';
import {FooterModule} from './footer/footer.module';
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
  ],
  declarations: []
})
export class ViewModule {}
