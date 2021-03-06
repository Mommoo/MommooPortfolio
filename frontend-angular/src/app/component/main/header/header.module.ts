import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MommooUIModule} from '../../../../mommoo-library/ui/ui.module';
import {CollapsibleBoxComponent} from './collapsible-box/collapsible-box.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderMenuController} from './header-menu-controller.service';
import {MenuButtonComponent} from './menu-button/menu-button.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    BrowserAnimationsModule
  ],
  providers: [
    HeaderMenuController
  ],
  declarations: [
    HeaderComponent,
    MenuListComponent,
    CollapsibleBoxComponent,
    MenuButtonComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
