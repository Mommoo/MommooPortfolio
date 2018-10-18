import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import {MenuButtonComponent} from './menu/menu-button/menu-button.component';
import {MenuListComponent} from './menu/menu-list/menu-list.component';
import {HeaderMenuListEventService} from './header-menu-list-event.service';
import {MommooUIModule} from '../../../mommoo-library/ui/ui.module';
import {MommooCommonModule} from '../../../mommoo-library/ui/common/common.module';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    MommooCommonModule
  ],
  exports : [
    HeaderComponent
  ],
  declarations: [HeaderComponent, MenuButtonComponent, MenuListComponent],
  providers : [HeaderMenuListEventService]
})
export class HeaderModule { }
