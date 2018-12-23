export const enum MenuButtonState {
  OPENED,
  CLOSED
}

export const enum MenuButtonEvent {
  OPEN,
  CLOSE
}

export type OnMenuItemClickEventListener = (menuItemName: string) => void;

export type OnMenuItemsChangedListener = (menuItems: string[]) => void;
