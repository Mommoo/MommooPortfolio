export enum HeaderMenu {
  PROFILE = 'profile',
  ABOUT = 'about',
  PROJECT = 'project',
  BLOG = 'blog',
  GITHUB = 'github'
}

export const enum MenuButtonState {
  OPENED,
  CLOSED
}

export const enum MenuButtonEvent {
  OPEN,
  CLOSE
}

export type HeaderMenuClickListener = (menu : HeaderMenu) => void;
