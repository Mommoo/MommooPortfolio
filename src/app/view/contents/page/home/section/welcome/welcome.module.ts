import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';
import {WelcomeSection} from './welcome.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [WelcomeSection],
  declarations: [WelcomeSection]
})
export class WelcomeModule {

}
