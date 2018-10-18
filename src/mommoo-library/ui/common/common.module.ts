import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StyledTextContentContainer} from './component/styled-text-content-container.component';
import {MommooShadowBox} from './shadow-box/shadow-box.component';
import {MommooRippleModule} from './ripple/ripple.module';

@NgModule({
  imports: [
    CommonModule,
    MommooRippleModule
  ],
  providers : [],
  exports : [StyledTextContentContainer, MommooShadowBox, MommooRippleModule],
  declarations: [StyledTextContentContainer, MommooShadowBox]
})
export class MommooCommonModule { }
