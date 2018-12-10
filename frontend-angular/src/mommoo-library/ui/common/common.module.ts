import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooShadowBox} from './shadow-box/shadow-box.component';
import {MommooRippleModule} from './ripple/ripple.module';

@NgModule({
  imports: [
    CommonModule,
    MommooRippleModule
  ],
  providers : [],
  exports : [MommooShadowBox, MommooRippleModule],
  declarations: [MommooShadowBox]
})
export class MommooCommonModule { }
