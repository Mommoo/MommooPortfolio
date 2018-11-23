export enum ViewportState {
  X_LARGE,
  LARGE,
  X_MEDIUM,
  MEDIUM,
  SMALL
}

export type ViewportStatusListener = (status: ViewportState)=>void;
