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
  constructor() {}

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

  public addViewportResizeListener( resizeListener : (windowSize : number) => void , firstTimeRun : boolean ) : void {
    if ( firstTimeRun ) {
      resizeListener(window.innerWidth);
    }
    window.addEventListener('resize', ()=> resizeListener(window.innerWidth));
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
