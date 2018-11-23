import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileSection} from './profile.component';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [ProfileSection],
  declarations: [ProfileSection]
})
export class ProfileModule { }
