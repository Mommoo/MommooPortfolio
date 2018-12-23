import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {HeaderMenuController} from '../header/header-menu-controller.service';

@Component({
  selector: 'basic-contents',
  templateUrl: './basic-contents.component.html',
  styleUrls: ['./basic-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicContentsComponent {
  private static readonly menuItemNames = ['profile', 'about', 'project', 'blog', 'github'];

  public constructor(headerMenuController: HeaderMenuController) {
    headerMenuController.setMenuItems(BasicContentsComponent.menuItemNames);
    headerMenuController.setOnMenuItemClickListener(this.menuItemClickEventListener);
  }

  private get menuItemClickEventListener() {
    return menuItemName => {
      alert(menuItemName);
    };
  }

}
