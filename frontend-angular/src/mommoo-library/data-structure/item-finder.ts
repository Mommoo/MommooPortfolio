import {NumberIdGenerator} from '../util/number-id-generator';

export class ItemFinder<T> {
  public static readonly DEFAULT_DIGIT_OF_EVENT_ID = 6;

  private readonly itemIdGenerator: NumberIdGenerator;
  private readonly itemMap = new Map<string, T>();

  public constructor(digitOfEventID = ItemFinder.DEFAULT_DIGIT_OF_EVENT_ID) {
    this.itemIdGenerator = new NumberIdGenerator(digitOfEventID);
  }

  public addItem(item: T): string {
    const itemID = this.itemIdGenerator.generate();
    this.itemMap.set(itemID, item);
    return itemID;
  }

  public getItem(itemID: string): T {
    return this.itemMap.get(itemID);
  }

  public removeItem(itemID: string) {
    this.itemMap.delete(itemID);
  }

  public readonlyMap() {
    return new Map(this.itemMap);
  }

  public get size() {
    return this.itemMap.size;
  }
}
