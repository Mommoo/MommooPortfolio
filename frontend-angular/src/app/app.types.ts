export enum AppIconType {
  PDF = 'pdf',
  GITHUB = 'github',
  TISTORY = 'tistory',
  ARROW_BACK = 'arrow-back',
  MAIL = 'mail'
}

export type AppIconPathFinder = Map<AppIconType, string>;

export enum ResolveKey {
  APP_ICON = 'appIconData',
  BASIC_CONTENTS = 'basicContentsData',
  PROJECT_CONTENTS = 'projectContentsData'
}
