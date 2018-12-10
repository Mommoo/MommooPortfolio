export enum ViewportSize {
  DESKTOP = 'desktop',
  TABLET = 'tablet',
  MOBILE = 'mobile'
}

export type ViewportChangeListener = (viewportSize : ViewportSize) => void;
