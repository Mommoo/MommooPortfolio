import {
  BasicViewportSizeChangeListener,
  BasicViewportSizeState,
  ScreenResolutionChangeListener,
  ScreenResolutionState,
  ViewportSizeChangeListener,
  ViewportSizeState
} from './window-size-handler.type';
import {NumberIdGenerator} from '../../../util/number-id-generator';
import {BasicViewportSizeStatus, ScreenResolutionStatus, ViewportSizeStatus, WindowSizeStatus} from './window-size-handler.status';

/**
 * This provides API that user can attach event to window as to {@link WindowSizeState}
 * But, also there is normal event not {@link WindowSizeState}.
 * For example, simply window resizing event or window resize done event and so on.
 *
 * All of event is have string integer id created {@link NumberIdGenerator}
 * and it is will be used to removing event at window
 *
 * Because user usually want to invoking callback at the first time,
 * the class's all of APIs receive parameter 'initRun'
 */
export class WindowSizeEventHandler {
  private static readonly RESIZING_HOLD_TIME = 400;
  private static readonly eventFinder = new Map<string, [string, any]>();
  private static readonly keyGenerator = new NumberIdGenerator();

  /**
   * @description: it is enable to detect the moment of when user resizing pause
   */
  public static addDoneResizingEvent(eventListener, initRun = false): string {
    if ( initRun ) {
      eventListener();
    }
    let resizeID;
    const doneResizing = () => {
      clearTimeout(resizeID);
      resizeID = setTimeout(eventListener, WindowSizeEventHandler.RESIZING_HOLD_TIME);
    };

    return WindowSizeEventHandler.addEvent('resize', doneResizing);
  }

  public static addResizingEvent(eventListener, initRun = false): string {
    if ( initRun ) {
      eventListener();
    }
    return WindowSizeEventHandler.addEvent('resize', eventListener);
  }

  public static addViewportSizeStateChangeEvent(eventListener: ViewportSizeChangeListener, initRun = false): string {
    if ( initRun ) {
      eventListener(this.getViewportSizeState());
    }
    const viewportSizeStateChangeEvent
      = this.createChangeDetectEventListener(ViewportSizeStatus, eventListener);
    return WindowSizeEventHandler.addEvent('resize', viewportSizeStateChangeEvent);
  }

  public static addBasicViewportSizeStateChangeEvent(eventListener: BasicViewportSizeChangeListener, initRun = false): string {
    if ( initRun ) {
      eventListener(this.getBasicViewportSizeState());
    }
    const basicViewportSizeStateChangeEvent
      = this.createChangeDetectEventListener(BasicViewportSizeStatus, eventListener);
    return WindowSizeEventHandler.addEvent('resize', basicViewportSizeStateChangeEvent);
  }

  public static addScreenResolutionChangeEvent(eventListener: ScreenResolutionChangeListener, initRun = false): string {
    if ( initRun ) {
      eventListener(this.getScreenResolution());
    }
    const resolutionChangeEvent = this.createChangeDetectEventListener(ScreenResolutionStatus, eventListener);
    return WindowSizeEventHandler.addEvent('resize', resolutionChangeEvent);
  }

  public static removeEvent(eventID: string) {
    if ( eventID === undefined ) {
      return;
    }

    const [eventName, eventListener] = WindowSizeEventHandler.eventFinder.get(eventID);
    window.removeEventListener(eventName, eventListener);
    WindowSizeEventHandler.eventFinder.delete(eventID);
  }

  public static getViewportSizeState(): ViewportSizeState {
    return ViewportSizeStatus.getState() as ViewportSizeState;
  }

  public static getBasicViewportSizeState(): BasicViewportSizeState {
    return BasicViewportSizeStatus.getState() as BasicViewportSizeState;
  }

  public static getScreenResolution(): ScreenResolutionState {
    return ScreenResolutionStatus.getState() as ScreenResolutionState;
  }

  public static getEventList(): string[] {
    return Array.from(WindowSizeEventHandler.eventFinder.keys());
  }

  private static addEvent(eventName: string, callback): string {
    window.addEventListener(eventName, callback);
    const eventID = WindowSizeEventHandler.keyGenerator.generate();
    WindowSizeEventHandler.eventFinder.set(eventID, [eventName, callback]);
    return eventID;
  }

  private static createChangeDetectEventListener(eventStatus: WindowSizeStatus, eventListener) {
    let previousState = eventStatus.getState();

    return () => {
      const currentState = eventStatus.getState();
      if (previousState !== currentState) {
        eventListener(currentState);
        previousState = currentState;
      }
    };
  }
}
