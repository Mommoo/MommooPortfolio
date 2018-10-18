import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {NameCardComponent} from './name-card/name-card.component';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [ProfileComponent],
  declarations: [ProfileComponent, NameCardComponent]
})
export class ProfileModule { }
