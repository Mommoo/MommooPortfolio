import {CompareCallback, ReduceCallback, StreamCallback} from './type';

export class List<T> {
  private static readonly DEFAULT_CAPACITY = 10;
  private _capacity = List.DEFAULT_CAPACITY;
  private repo: T[] = new Array(List.DEFAULT_CAPACITY);
  private index = -1;

  public constructor(...items: T[]) {
    items
      .filter(item => item !== undefined)
      .filter(item => item !== null)
      .forEach((item) => this.add(item));
  }

  public add(item: T, index: number = this.index + 1) {
    if ( index > this.index + 1 ) {
      console.error(`index: ${index} is large than size of list`);
      return;
    }

    if ( index !== this.index + 1 ) {
      this.moveSlice(index, 'right');
    }
    this.repo[index] = item;
    this.index++;
    this.increaseCapacityIfLack();
  }

  public get(index: number) {
    if (index > this.index) {
      console.error(`index: ${index} is large than size of list`);
    }
    return this.repo[index];
  }

  public remove(index: number): boolean;

  public remove(item: T): boolean;

  public remove(target: number | T): boolean {
    let index;
    if ( typeof target !== 'number' ) {
      index = this.repo.findIndex(_item => _item === target);
    } else {
      index = target;
    }

    if ( index < 0 || this.index < index ) {
      return false;
    }

    this.moveSlice(index + 1, 'left');
    this.repo[this.index--] = undefined;
    this.decreaseCapacityIfEnough();
    return true;
  }
  // TODO increare Area 버그 잡기.
  private moveSlice(fromIndex: number, direction: 'left' | 'right') {
    const needToCopySlice = this.repo.slice(fromIndex);
    const directionValue = direction === 'left' ? -1 : +1;
    for ( let i = 0; i < needToCopySlice.length ; i++ ) {
      this.repo[fromIndex + directionValue + i] = needToCopySlice[i];
    }
  }

  public forEach(fn: StreamCallback<T, void>): void {
    this.values().forEach(fn);
  }

  public filter(fn: StreamCallback<T, void>): T[] {
    return this.values().filter(fn);
  }

  public find(fn: StreamCallback<T, boolean>): T {
    return this.values().find(fn);
  }

  public reduce<K>(fn: ReduceCallback<T, K>, initialValue?: K) {
    return this.values().reduce<K>(fn, initialValue);
  }

  public findIndex(fn: StreamCallback<T, boolean>): number {
    return this.values().findIndex(fn);
  }

  public indexOf(item: T, fromIndex?: number): number {
    return this.values().indexOf(item, fromIndex);
  }

  public lastIndexOf(item: T, fromIndex?: number): number {
    return this.values().lastIndexOf(item, fromIndex);
  }

  public values(): T[] {
    return this.repo.slice(0, this.size());
  }

  public some(fn: StreamCallback<T, boolean>): boolean {
    return this.values().some(fn);
  }

  public every(fn: StreamCallback<T, boolean>): boolean {
    return this.values().every(fn);
  }

  public join(separator?: string): string {
    return this.values().join(separator);
  }

  public size(): number {
    return this.index + 1;
  }

  public capacity(): number {
    return this._capacity;
  }

  public sort(fn?: CompareCallback<T>): void {
    this.values().sort(fn);
  }

  public includes(item: T, fromIndex?: number): boolean {
    return this.values().includes(item, fromIndex);
  }

  public addAll(items: List<T> | T[]): void {
    if ( items instanceof Array ) {
      items = new List<T>(...items);
    }
    items.forEach(item => this.add(item));
  }

  public subList(startIndex: number, endIndex?: number): List<T> {
    return new List(...this.values().slice(startIndex, endIndex));
  }

  private increaseCapacityIfLack() {
    if ( this.capacity() === this.size() ) {
      const newCapacity = this._capacity * 2;
      this.setNewCapacity(newCapacity);
    }
  }

  private decreaseCapacityIfEnough() {
    if ( (this.size() * 2) + 4 === this.capacity() ) {
      const newCapacity = this.capacity() / 2;
      this.setNewCapacity(newCapacity);
    }
  }

  private setNewCapacity(newCapacity: number) {
    this._capacity   = newCapacity;
    this.repo.length = newCapacity;
  }

  public toString(): string {
    return `[${this.values().toString()}]`;
  }
}
