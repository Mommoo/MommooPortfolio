import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LabelComponent} from './label/label.component';
import { GuideComponent } from './guide/guide.component';
import {MommooGridListModule} from './grid-list/grid-list.module';
import {MommooCardModule} from './card/card.module';

@NgModule({
  imports: [
    CommonModule,
    MommooGridListModule,
    MommooCardModule
  ],
  exports : [
    LabelComponent,
    GuideComponent,
    MommooGridListModule,
    MommooCardModule
  ],
  declarations: [LabelComponent, GuideComponent]
})
export class UiModule { }
