import {Injectable} from '@angular/core';
import {NumberIdGenerator} from '../../../mommoo-library/util/number-id-generator';
import {HeaderEventSubject, MenuItemClickEventListener} from './types';

@Injectable()
export class HeaderEventPublisher {
  private readonly menuItemClickEventFinder = new Map<string, MenuItemClickEventListener>();
  private readonly keyGenerator = new NumberIdGenerator();

  public publishMenuItemClickEvent(menuItem: string) {
    Array.from(this.menuItemClickEventFinder.values())
      .forEach(clickEventListener => clickEventListener(menuItem));
  }

  public unSubscribe(eventID: string) {
    this.menuItemClickEventFinder.delete(eventID);
  }

  public subscribeMenuItemClickEvent(menuItemClickEventListener: MenuItemClickEventListener): string {
    const eventID = this.keyGenerator.generate();
    this.menuItemClickEventFinder.set(eventID, menuItemClickEventListener);
    return eventID;
  }
}
