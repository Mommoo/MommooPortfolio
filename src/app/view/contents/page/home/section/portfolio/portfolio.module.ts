import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {MommooUIModule} from '../../../../../../../mommoo-library/ui/ui.module';
import { LimitedTextareaComponent } from './limited-textarea/limited-textarea.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    HttpClientModule
  ],
  exports : [
    PortfolioComponent
  ],
  declarations: [PortfolioComponent, LimitedTextareaComponent]
})
export class PortfolioModule { }
