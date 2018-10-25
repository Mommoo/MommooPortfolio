import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {HeaderEventPublisher} from './header-event-publisher.service';
import {MommooUIModule} from '../../../mommoo-library/ui/ui.module';
import {MommooCommonModule} from '../../../mommoo-library/ui/common/common.module';
import {MenuButtonAnimator} from './menu-button/menu-button-animator.service';
import { AnimationBoxComponent } from './animation-box/animation-box.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    MommooCommonModule
  ],
  exports : [
    HeaderComponent
  ],
  declarations: [HeaderComponent, MenuButtonComponent, MenuListComponent, AnimationBoxComponent],
  providers : [HeaderEventPublisher, MenuButtonAnimator]
})
export class HeaderModule { }
