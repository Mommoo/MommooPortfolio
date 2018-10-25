export const enum MenuButtonState {
  OPENED,
  CLOSED
}

export const enum MenuButtonEvent {
  OPEN,
  CLOSE
}

export type MenuItemClickEventListener = (menuItemName: string)=>void;

export interface HeaderEventSubject {
  menuItemClickEventListener: MenuItemClickEventListener
}
