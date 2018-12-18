import {BasePage} from './page/base-page';

export interface PageNavigation {
  component: any;
  staticURL: string;
  basePage: BasePage;
}

export interface Page {
  name: string;
  staticURL: string;
  headerMenuItems: string[];
}

export type PageChangeListener = (currentPage: Page) => void;

export interface ContentsItem {
  readonly preferredWidth: number;
  readonly minWidth: number;
}

export type ContentsLayoutChangeListener = (contentsLayout: ContentsLayout) => void;

export interface SubscribeContext {
  readonly contentsItem: ContentsItem;
  readonly eventListener: ContentsLayoutChangeListener;
  previousContentsLayout: ContentsLayout;
}

export class ContentsLayout {
  private static INVALID_INSTANCE = new ContentsLayout(-1, -1);
  public readonly numberOfItem: number;
  public readonly calculatedItemWidth;

  public constructor(numberOfItem: number, calculatedItemWidth: number) {
    this.numberOfItem = numberOfItem;
    this.calculatedItemWidth = calculatedItemWidth;
  }

  public static get invalidInstance() {
    return this.INVALID_INSTANCE;

  }

  public values() {
    return [this.numberOfItem, this.calculatedItemWidth];
  }
}
