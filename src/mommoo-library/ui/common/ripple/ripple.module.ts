import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooRipple} from './ripple.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [MommooRipple],
  declarations: [MommooRipple]
})
export class MommooRippleModule { }
