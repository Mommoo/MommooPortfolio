import {Injectable} from '@angular/core';
import {HeaderMenu} from './types';

export interface HeaderMenuClickEvent {
  (menu : HeaderMenu) : void;
}

@Injectable()
export class HeaderMenuListEventService {

  private readonly eventSubscribeList : HeaderMenuClickEvent[] = [];

  public notifyEvent(headerMenu : HeaderMenu) {
    this.eventSubscribeList.forEach(menuListEvent => menuListEvent(headerMenu));
  }

  public subscribe(headerMenuClickEvent : HeaderMenuClickEvent) {
    this.eventSubscribeList.push(headerMenuClickEvent);
  }
}
