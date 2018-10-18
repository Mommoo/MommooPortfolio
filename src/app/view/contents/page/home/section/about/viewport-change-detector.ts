import {WindowEventHandler} from '../../../../../../../mommoo-library/handler/window/window-event';
import {ViewportState, ViewportStatusListener} from './types';

export class ViewportChangeDetector{
  private resizeEventID: string;
  private currentViewportStatus: ViewportState;

  public constructor() {
    this.resizeEventID = WindowEventHandler.addResizingEvent(()=>{

    });
  }

  public clear() {
    if ( this.resizeEventID ) {
      WindowEventHandler.removeEvent(this.resizeEventID);
    }
  }

  public setViewportStatusListener(viewportStatusListener: ViewportStatusListener){
    this.clear();
    this.resizeEventID = WindowEventHandler.addResizingEvent(()=>{
      if ( this.currentViewportStatus === ViewportChangeDetector.checkViewportState() ) {
        return true;
      }

      this.currentViewportStatus = ViewportChangeDetector.checkViewportState();
      viewportStatusListener(this.currentViewportStatus);
    }, true);
  }

  public static checkViewportState(): ViewportState {
    const innerWidth = window.innerWidth;
    if ( innerWidth > 1400) {
      return ViewportState.X_LARGE;
    } else if ( 1250 < innerWidth && innerWidth <= 1400 ) {
      return ViewportState.LARGE;
    } else if ( 1025 < innerWidth && innerWidth <= 1250 ){
      return ViewportState.X_MEDIUM;
    } else if ( 768 < innerWidth && innerWidth <= 1025) {
      return ViewportState.MEDIUM;
    } else if ( innerWidth <= 768 ) {
      return ViewportState.SMALL;
    }
  }
}
