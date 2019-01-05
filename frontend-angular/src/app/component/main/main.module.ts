import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooUIModule} from '../../../mommoo-library/ui/ui.module';
import {MainComponent} from './main.component';
import {HeaderModule} from './header/header.module';
import {FooterModule} from './footer/footer.module';
import {RouterModule} from '@angular/router';
import {ContentsModule} from './contents/contents.module';
import {MainCommonAnimator} from './main.common-animator.service';
import {MainComponentLayoutDetector} from './main.component-layout-detector.service';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    HeaderModule,
    FooterModule,
    ContentsModule,
    RouterModule
  ],
  providers: [
    MainComponentLayoutDetector,
    MainCommonAnimator
  ],
  exports: [
    MainComponent
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }

