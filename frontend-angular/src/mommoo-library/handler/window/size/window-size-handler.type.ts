export type WindowSizeState = ViewportSizeState | BasicViewportSizeState | ScreenResolutionState;

export enum ViewportSizeState {
  XX_LARGE,
  X_LARGE,
  LARGE,
  X_MEDIUM,
  MEDIUM,
  X_SMALL,
  SMALL
}

export type ViewportSizeChangeListener = (viewportSizeState: ViewportSizeState) => void;

export enum BasicViewportSizeState {
  LARGE,
  MEDIUM,
  SMALL
}

export type BasicViewportSizeChangeListener = (basicViewportSizeState: BasicViewportSizeState) => void;

export enum ScreenResolutionState {
  SD = 'Standard Definition(SD)',
  HD = 'High Definition(HD)',
  FHD = 'Full High Definition(FHD)',
  QHD = 'Quad High Definition(QHD)',
  UHD_4K = '4k-Ultra High Definition(4KUHD)',
  UHD_8K = '8k-Ultra High Definition(8KUHD)'
}

export type ScreenResolutionChangeListener = (screenResolutionState: ScreenResolutionState) => void;
