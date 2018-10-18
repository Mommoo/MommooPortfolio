export enum HeaderMenu {
  PROFILE = 'profile',
  ABOUT = 'about',
  PORTFOLIO = 'portfolio',
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
