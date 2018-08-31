import { Injectable } from '@angular/core';

export enum ViewportDimension {
  DESKTOP,
  TABLET,
  MOBILE
}

export interface ViewportChangedListener {
  (viewportDimension : ViewportDimension) : void;
}

@Injectable()
export class WindowEventService {
  private eventFinder : Map<string, Map<string,any>> = new Map<string, Map<string,any>>();

  constructor() {
    this.eventFinder.set('resize', new Map<string, any>());
  }

  public addViewportDimensionDetectListener(viewportChangedListener : ViewportChangedListener, firstTimeRun : boolean) : void {
    let currentViewportDimension : ViewportDimension = WindowEventService.getViewportDimension();

    const resizeListener = () => {
      const viewportDimension = WindowEventService.getViewportDimension();
      if ( currentViewportDimension !== viewportDimension ) {
        viewportChangedListener(viewportDimension);
        currentViewportDimension = viewportDimension;
      }
    };

    if ( firstTimeRun ) {
      viewportChangedListener( WindowEventService.getViewportDimension() );
    }

    window.addEventListener('resize', resizeListener);
  }

  public addViewportResizeListener( eventID : string, resizeListener : (windowSize : number) => void , firstTimeRun : boolean ) : void {
    const resizeEventFinder = this.eventFinder.get('resize');
    if ( resizeEventFinder.has(eventID) ) {
      return;
    }

    const event = ()=> resizeListener(window.innerWidth);

    if ( firstTimeRun ) {
      event();
    }
    window.addEventListener('resize', event);
    resizeEventFinder.set(eventID, event);
  }

  public removeEvent( eventID : string ) {
    const iterator = this.eventFinder.keys();
    while ( true ) {
      const item = iterator.next();
      if ( item.done ) {
        break;
      }

      if ( this.eventFinder.get(item.value).has(eventID) ) {
        window.removeEventListener(item.value, this.eventFinder.get(item.value).get(eventID));
        this.eventFinder.get(item.value).delete(eventID);
        break;
      }
    }
  }

  public static isDesktopViewport() : boolean {
    return 1025 <= window.innerWidth;
  }

  public static isTabletViewport() : boolean {
    return 768 <=window.innerWidth && window.innerWidth <= 1024
  }

  public static isMobileViewport() : boolean {
    return window.innerWidth <= 767;
  }

  private static getViewportDimension() : ViewportDimension {
    if ( this.isDesktopViewport() ) {
      return ViewportDimension.DESKTOP;
    } else if ( this.isTabletViewport() ) {
      return ViewportDimension.TABLET;
    } else {
      return ViewportDimension.MOBILE;
    }
  }
}
