import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooUIModule} from '../../../mommoo-library/ui/ui.module';
import {MainComponent} from './main.component';
import {HeaderModule} from './header/header.module';
import {FooterModule} from './footer/footer.module';
import {RouterModule} from '@angular/router';
import {BasicContentsModule} from './basic-contents/basic-contents.module';
import {ProjectContentsModule} from './project-contents/project-contents.module';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    HeaderModule,
    FooterModule,
    BasicContentsModule,
    ProjectContentsModule,
    RouterModule
  ],
  exports: [
    MainComponent
  ],
  declarations: [
    MainComponent
  ]
})
export class MainModule { }

