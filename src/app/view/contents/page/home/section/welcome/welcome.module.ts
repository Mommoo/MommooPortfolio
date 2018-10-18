import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';
import {WelcomeComponent} from './welcome.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [WelcomeComponent],
  declarations: [WelcomeComponent]
})
export class WelcomeModule {

}
