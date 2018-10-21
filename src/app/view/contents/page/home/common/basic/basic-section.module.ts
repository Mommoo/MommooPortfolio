import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannerPageTemplate} from './basic-section.component';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  /** To promiseLoadImage specific component dynamically by using angular compiler
   * so, need to notify about what component will be loaded dynamically */
  entryComponents : [BannerPageTemplate],
  declarations: [BannerPageTemplate]
})
export class BasicSectionModule { }
