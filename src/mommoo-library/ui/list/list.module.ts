import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MommooList} from './list.component';
import { MommooListItem } from './list-item.component';
import { MommooListTitle } from './list-title.component';
import { MommooListSection } from './list-section.component';
import {MommooCommonModule} from '../common/common.module';

@NgModule({
  imports: [
    CommonModule,
    MommooCommonModule
  ],
  exports : [
    MommooList, MommooListItem, MommooListTitle, MommooListSection
  ],
  declarations: [MommooList, MommooListItem, MommooListTitle, MommooListSection]
})
export class MommooListModule { }
