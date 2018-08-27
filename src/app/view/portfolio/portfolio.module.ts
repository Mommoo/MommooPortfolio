import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {MommooUIModule} from '../../ui/ui.module';
import { LimitedTextareaComponent } from './limited-textarea/limited-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule
  ],
  exports : [
    PortfolioComponent
  ],
  declarations: [PortfolioComponent, LimitedTextareaComponent]
})
export class PortfolioModule { }
