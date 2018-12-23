import {Injectable} from '@angular/core';
import {OnMenuItemClickEventListener, OnMenuItemsChangedListener} from './header.types';

@Injectable()
export class HeaderMenuController {
  private menuItems: string[];
  private onMenuItemClickListener: OnMenuItemClickEventListener;
  private onMenuItemChangedListenerList: OnMenuItemsChangedListener[] = [];

  constructor() {

  }

  public notifyMenuItemClickEvent(menuItemName: string) {
    if ( this.onMenuItemClickListener ) {
      this.onMenuItemClickListener(menuItemName);
    }
  }

  public addOnMenuItemsChangedListener(onMenuItemsChangedListener: OnMenuItemsChangedListener) {
    this.onMenuItemChangedListenerList.push(onMenuItemsChangedListener);
    const isExistMenuItems = this.menuItems && this.menuItems.length > 0;
    if ( isExistMenuItems ) {
      onMenuItemsChangedListener(this.menuItems);
    }
  }

  public removeMenuItemsChangeListener(changedListener) {
    const foundIndex = this.onMenuItemChangedListenerList.findIndex(changedListener);
    if ( foundIndex !== -1 ) {
      this.onMenuItemChangedListenerList.splice(foundIndex, 1);
    }
  }

  public setMenuItems(menuItems: string[]) {
    this.menuItems = menuItems;
    this.onMenuItemChangedListenerList.forEach(changedListener => changedListener(menuItems));
  }

  public setOnMenuItemClickListener(menuItemClickEventListener: OnMenuItemClickEventListener) {
    this.onMenuItemClickListener = menuItemClickEventListener;
  }
}
