export interface ColumnItemWidth {
  readonly preferred: number;
  readonly minimum: number;
}

export interface SubscribeContext {
  readonly columnItemWidth: ColumnItemWidth;
  readonly eventListener: ColumnLayoutChangeListener;
  columnLayout: ColumnLayout;
}

export interface ColumnLayout {
  readonly count: number;
  readonly width: number;
}

export const invalidColumnLayout: ColumnLayout = {
  count: -1,
  width: -1
};

export type ColumnLayoutChangeListener = (columnLayout: ColumnLayout) => void;
