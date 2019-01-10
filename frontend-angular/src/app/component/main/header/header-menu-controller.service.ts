import {Injectable} from '@angular/core';
import {OnHeaderMenuEventChangeListener, OnMenuClickEventListener} from './header.types';

/**
 * This class provides critical three functions that any component can reference as service
 * (Note. this class have to connected to {@link HeaderComponent}
 * used by {@link addOnHeaderMenuEventChangeListener} )
 *
 * first of all is requesting header's menu item change by injecting menu names.
 * {@link addOnHeaderMenuEventChangeListener}.
 *
 * second of all is observed header's menu item click events.
 * {@link addOnHeaderMenuEventChangeListener}.
 *
 * last of all is can turn on/off header menu's back button visibility.
 * {@link setBackButtonVisible}.
 */
@Injectable()
export class HeaderMenuController {
  private menuNames: string[];
  private isBackButtonVisible = false;
  private onMenuClickEventListener: OnMenuClickEventListener;
  private onHeaderMenuEventChangeListeners: OnHeaderMenuEventChangeListener[] = [];

  public constructor() {

  }

  public notifyMenuNameClickEvent(menuName: string) {
    if ( this.onMenuClickEventListener ) {
      this.onMenuClickEventListener(menuName);
    }
  }

  /** because of fake menu-list component attached at fake header,
   * provide add interface not set */
  public addOnHeaderMenuEventChangeListener(onHeaderMenuEventChangeListener: OnHeaderMenuEventChangeListener) {
    this.onHeaderMenuEventChangeListeners.push(onHeaderMenuEventChangeListener);

    const isExistMenuItems = this.menuNames && this.menuNames.length > 0;
    if ( isExistMenuItems ) {
      onHeaderMenuEventChangeListener.onMenuNamesChangeListener(this.menuNames);
    }

    onHeaderMenuEventChangeListener.onBackButtonVisibleChangeListener(this.isBackButtonVisible);
  }

  public removeOnHeaderMenuEventChangeListener
  (onHeaderMenuEventChangeListener: OnHeaderMenuEventChangeListener) {
    const foundIndex
      = this.onHeaderMenuEventChangeListeners
      .findIndex(value => onHeaderMenuEventChangeListener === value);
    if ( foundIndex !== -1 ) {
      this.onHeaderMenuEventChangeListeners.splice(foundIndex, 1);
    }
  }

  public setMenuNames(menuNames: string[]) {
    this.menuNames = menuNames;
    this.onHeaderMenuEventChangeListeners
      .forEach(menuControlListener => menuControlListener.onMenuNamesChangeListener(menuNames));
  }

  public clearMenuNames() {
    this.setMenuNames([]);
  }

  public setOnMenuItemClickListener(menuItemClickEventListener: OnMenuClickEventListener) {
    this.onMenuClickEventListener = menuItemClickEventListener;
  }

  public setBackButtonVisible(backButtonVisible: boolean) {
    this.isBackButtonVisible = backButtonVisible;
    this.onHeaderMenuEventChangeListeners
      .forEach(menuControlListener => menuControlListener.onBackButtonVisibleChangeListener(backButtonVisible));
  }
}
