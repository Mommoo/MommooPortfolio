import {Injectable} from '@angular/core';
import {HeaderMenu} from './menu/menu-list/menu-list.component';

export interface HeaderMenuClickEvent {
  (menu : HeaderMenu) : void;
}

@Injectable()
export class HeaderMenuListEventService {

  private readonly eventSubscribeList : HeaderMenuClickEvent[] = [];

  private _notifyEvent(headerMenu : HeaderMenu) {
    this.eventSubscribeList.forEach(menuListEvent => menuListEvent(headerMenu));
  }

  public subscribe(headerMenuClickEvent : HeaderMenuClickEvent) {
    this.eventSubscribeList.push(headerMenuClickEvent);
  }
}
