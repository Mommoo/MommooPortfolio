import {Injectable} from '@angular/core';
import {HeaderMenu, HeaderMenuClickListener} from './types';
import {NumberIdGenerator} from '../../../mommoo-library/util/number-id-generator';

@Injectable()
export class HeaderMenuListEventService {
  private readonly eventMap = new Map<string, any>();
  private readonly keyGenerator = new NumberIdGenerator();

  public notifyEvent(headerMenu : HeaderMenu) {
    Array.from(this.eventMap.values())
      .forEach(headerMenuClickListener => headerMenuClickListener(headerMenu));
  }

  public subscribe(headerMenuClickListener : HeaderMenuClickListener) {
    const eventID = this.keyGenerator.generate();
    this.eventMap.set(eventID, headerMenuClickListener);

    return eventID;
  }
  
  public unSubscribe(eventID : string) : boolean {
    this.eventMap.delete(eventID);
    return this.keyGenerator.removeID(eventID);
  }
}
