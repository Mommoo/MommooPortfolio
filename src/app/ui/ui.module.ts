import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LabelComponent} from './label/label.component';
import { SkillCardComponent } from './skill-card/skill-card.component';
import { GuideComponent } from './guide/guide.component';
import {MommooGridListModule} from './grid-list/grid-list.module';
import { MommooCard } from './card/card.component';
import {MommooCardModule} from './card/card.module';

@NgModule({
  imports: [
    CommonModule,
    MommooGridListModule,
    MommooCardModule
  ],
  exports : [
    LabelComponent,
    SkillCardComponent,
    GuideComponent,
    MommooGridListModule,
    MommooCardModule
  ],
  declarations: [LabelComponent, SkillCardComponent, GuideComponent]
})
export class UiModule { }
