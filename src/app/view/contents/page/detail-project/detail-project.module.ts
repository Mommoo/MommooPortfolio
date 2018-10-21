import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailProjectPage } from './detail-project.component';
import {FixedImageHeaderModule} from './section/fixed-image-header/fixed-image-header.module';

@NgModule({
  imports: [
    CommonModule,
    FixedImageHeaderModule
  ],
  declarations: [DetailProjectPage]
})
export class DetailProjectModule { }
