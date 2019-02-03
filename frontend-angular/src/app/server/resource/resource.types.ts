export interface WebResourcePath {
  readonly imageResourcePath: string;
  readonly fileResourcePath: string;
}

export enum ImageResourceType {
  LOGO = 'common/logo.png',
  PDF = 'common/file_extensions/pdf.svg',
  GITHUB = 'common/IT/github.svg',
  TISTORY = 'common/IT/tistory.svg',
  ARROW_BACK = 'common/navigation/arrow-back.svg',
  MAIL = 'common/communication/mail.svg'
}

export enum FileResourceType {
  MOMMOO_PORTFOLIO = 'MommooPortfolio.pdf',
}

export interface MommooPaper {
  readonly name: string;
  readonly fileWebPath: string;
}
