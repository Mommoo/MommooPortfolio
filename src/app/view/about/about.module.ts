import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooUIModule} from '../../ui/ui.module';
import {AboutComponent} from './about.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [
    AboutComponent
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
