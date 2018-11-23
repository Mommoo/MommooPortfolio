import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';
import {AboutSection} from './about.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [
    AboutSection
  ],
  declarations: [AboutSection]
})
export class AboutModule { }
