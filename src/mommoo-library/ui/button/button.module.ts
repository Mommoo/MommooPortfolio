import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooButton} from './button.component';
import {MommooCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    MommooCommonModule
  ],
  exports : [MommooButton],
  declarations: [MommooButton]
})
export class MommooButtonModule { }
