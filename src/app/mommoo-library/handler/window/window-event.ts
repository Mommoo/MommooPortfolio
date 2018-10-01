import {ViewportChangeListener, ViewportSize} from './type';

export class WindowEventHandler {
  private static readonly RESIZING_HOLD_TIME = 400;
  private static readonly eventFinder = new Map<string, [string, any]>();

  public static addDoneResizingEvent(eventID: string, eventListener) {
    let resizeID;
    const doneResizing = () => {
      clearTimeout(resizeID);
      resizeID = setTimeout(eventListener, WindowEventHandler.RESIZING_HOLD_TIME);
    };

    WindowEventHandler.addEvent(eventID, 'resize', doneResizing);
  }

  public static addResizingEvent(eventID: string, eventListener, initRun: boolean = false) {
    if (initRun) {
      eventListener();
    }
    WindowEventHandler.addEvent(eventID, 'resize', eventListener);
  }

  public static addViewportChangeEvent(eventID: string, eventListener: ViewportChangeListener, initRun: boolean = false) {
    let currentViewportSize: ViewportSize = WindowEventHandler.getViewportSize();

    const viewportChangeEvent = () => {
      const viewportDimension = WindowEventHandler.getViewportSize();
      if (currentViewportSize !== viewportDimension) {
        eventListener(viewportDimension);
        currentViewportSize = viewportDimension;
      }
    };

    if (initRun) {
      eventListener(currentViewportSize);
    }

    WindowEventHandler.addEvent(eventID, 'resize', viewportChangeEvent);
  }

  public static hasEventID(eventID: string): boolean {
    return WindowEventHandler.eventFinder.has(eventID);
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

  private static addEvent(eventID: string, eventName: string, callback) {
    if (WindowEventHandler.hasEventID(eventID)) {
      console.error(`Event ID : '${eventID}' is already exist.`);
      return;
    }
    window.addEventListener(eventName, callback);
    WindowEventHandler.eventFinder.set(eventID, [eventName, callback]);
  }
}
