import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header.component';
import {MenuButtonComponent} from './menu/menu-button/menu-button.component';
import {MenuListComponent} from './menu/menu-list/menu-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    HeaderComponent
  ],
  declarations: [HeaderComponent, MenuButtonComponent, MenuListComponent]
})
export class HeaderModule { }
