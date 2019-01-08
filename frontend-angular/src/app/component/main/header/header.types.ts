import {ElementRef} from '@angular/core';

export const enum MenuButtonState {
  OPENED,
  CLOSED
}

export const enum MenuButtonEvent {
  OPEN,
  CLOSE
}

export interface OnHeaderMenuEventChangeListener {
  onMenuNamesChangeListener(menuNames: string[]): void;
  onBackButtonVisibleChangeListener(isBackButtonVisible: boolean): void;
}

export type OnMenuClickEventListener = (menuName: string) => void;

export interface AnimationKey {
  readonly animationName: string;
  readonly elementRef: ElementRef<HTMLElement>;
}

export interface MenuButtonLineOffsetsTop {
  readonly upperLineTop: number;
  readonly middleLineTop: number;
  readonly lowerLineTop: number;
}
