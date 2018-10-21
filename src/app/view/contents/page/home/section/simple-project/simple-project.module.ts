import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';
import {HttpClientModule} from '@angular/common/http';
import {LimitedTextareaComponent} from './limited-textarea.component';
import {SimpleProjectSection} from './simple-project.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    HttpClientModule
  ],
  exports : [
    SimpleProjectSection
  ],
  declarations: [SimpleProjectSection, LimitedTextareaComponent]
})
export class SimpleProjectModule { }
