import {
  BasicViewportSizeState,
  ScreenResolutionState,
  ViewportSizeState,
  WindowSizeState
} from './window-size-handler.type';

/**
 * This files declares object that have status {@link WindowSizeStatus}.
 * The status's state have to be declared at {@link WindowSizeState}.
 */

export interface WindowSizeStatus {
  getState(): WindowSizeState;
}

export const ViewportSizeStatus: WindowSizeStatus = {
  getState(): WindowSizeState {
    const innerWidth = window.innerWidth;
    if ( innerWidth >= 1536 ) {
      return ViewportSizeState.XX_LARGE;
    } else if ( 1280 <= innerWidth && innerWidth < 1536 ) {
      return ViewportSizeState.X_LARGE;
    } else if ( 1024 <= innerWidth && innerWidth < 1280 ) {
      return ViewportSizeState.LARGE;
    } else if ( 768 <= innerWidth && innerWidth < 1024 ) {
      return ViewportSizeState.X_MEDIUM;
    } else if ( 576 <= innerWidth && innerWidth < 768 ) {
      return ViewportSizeState.MEDIUM;
    } else if ( 384 <= innerWidth && innerWidth < 576) {
      return ViewportSizeState.X_SMALL;
    } else {
      return ViewportSizeState.SMALL;
    }
  }
};

export const BasicViewportSizeStatus: WindowSizeStatus = {
  getState(): WindowSizeState {
    const currentViewportSizeState = ViewportSizeStatus.getState();
    if ( currentViewportSizeState === ViewportSizeState.XX_LARGE
      || currentViewportSizeState === ViewportSizeState.X_LARGE
      || currentViewportSizeState === ViewportSizeState.LARGE ) {
      return BasicViewportSizeState.LARGE;
    } else if ( currentViewportSizeState === ViewportSizeState.X_MEDIUM || currentViewportSizeState === ViewportSizeState.MEDIUM ) {
      return BasicViewportSizeState.MEDIUM;
    } else {
      return BasicViewportSizeState.SMALL;
    }
  }
};

export const ScreenResolutionStatus: WindowSizeStatus = {
  getState(): WindowSizeState {
    const screenWidth = window.innerWidth;
    if ( screenWidth >= 7680 ) {
      return ScreenResolutionState.UHD_8K;
    } else if ( 3640 <= screenWidth && screenWidth < 7680 ) {
      return ScreenResolutionState.UHD_4K;
    } else if ( 2560 <= screenWidth && screenWidth < 3640 ) {
      return ScreenResolutionState.QHD;
    } else if ( 1920 <= screenWidth && screenWidth < 2560 ) {
      return ScreenResolutionState.FHD;
    } else if ( 1280 <= screenWidth && screenWidth < 1920 ) {
      return ScreenResolutionState.HD;
    } else if ( 720 <= screenWidth && screenWidth < 1280 ) {
      return ScreenResolutionState.SD;
    } else {
      return ScreenResolutionState.SD;
    }
  }
};
