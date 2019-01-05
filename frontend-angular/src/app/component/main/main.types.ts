export enum AnimationType {
  FADE_IN,
  SCROLL_AT
}

export interface ColumnItemWidth {
  readonly preferred: number;
  readonly minimum: number;
}

export interface Subscriber {
  readonly columnItemWidth: ColumnItemWidth;
  readonly eventListener: ColumnLayoutChangeListener;
  columnLayout: ColumnLayout;
}

export interface ColumnLayout {
  readonly count: number;
  readonly width: number;
}

export type ColumnLayoutChangeListener = (columnLayout: ColumnLayout) => void;

export interface HeaderLayout {
  readonly isCollapseMode: boolean;
  readonly collapseHeaderHeight: number;
}
