import {ViewportChangeListener, ViewportSize} from './type';
import {NumberIdGenerator} from '../../util/number-id-generator';

export class WindowEventHandler {
  private static readonly RESIZING_HOLD_TIME = 400;
  private static readonly eventFinder = new Map<string, [string, any]>();
  private static readonly keyGenerator = new NumberIdGenerator();

  public static addDoneResizingEvent(eventListener, initRun: boolean = false) : string {
    let resizeID;
    const doneResizing = () => {
      clearTimeout(resizeID);
      resizeID = setTimeout(eventListener, WindowEventHandler.RESIZING_HOLD_TIME);
    };

    return WindowEventHandler.addEvent('resize', doneResizing, initRun);
  }

  public static addResizingEvent(eventListener, initRun: boolean = false) : string {
    return WindowEventHandler.addEvent('resize', eventListener, initRun);
  }

  public static addViewportChangeEvent(eventListener: ViewportChangeListener, initRun: boolean = false) : string {
    let currentViewportSize: ViewportSize;

    const viewportChangeEvent = () => {
      const viewportDimension = WindowEventHandler.getViewportSize();
      if (currentViewportSize !== viewportDimension) {
        eventListener(viewportDimension);
        currentViewportSize = viewportDimension;
      }
    };

    return WindowEventHandler.addEvent('resize', viewportChangeEvent, initRun);
  }

  public static hasEventID(eventID: string): boolean {
    return WindowEventHandler.keyGenerator.hasID(eventID);
  }

  public static removeEvent(eventID: string) {
    const [eventName, eventListener] = WindowEventHandler.eventFinder.get(eventID);
    window.removeEventListener(eventName, eventListener);
    WindowEventHandler.eventFinder.delete(eventID);
  }

  public static getViewportSize(): ViewportSize {
    if (1025 <= window.innerWidth) {
      return ViewportSize.DESKTOP;
    } else if (768 <= window.innerWidth && window.innerWidth <= 1024) {
      return ViewportSize.TABLET;
    } else {
      return ViewportSize.MOBILE;
    }
  }

  public static getEventList(): string[] {
    const eventIterator = WindowEventHandler.eventFinder.keys();
    const eventList: string[] = [];
    while (true) {
      const {value, done} = eventIterator.next();
      if (done) {
        break;
      }
      eventList.push(value);
    }

    return eventList;
  }

  private static addEvent(eventName: string, callback, initRun : boolean) : string {
    window.addEventListener(eventName, callback);
    const eventID = WindowEventHandler.keyGenerator.generate();
    WindowEventHandler.eventFinder.set(eventID, [eventName, callback]);
    if ( initRun ) {
      callback();
    }
    return eventID;
  }
}
