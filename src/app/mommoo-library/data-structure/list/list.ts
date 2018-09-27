import {CompareCallback, ReduceCallback, StreamCallback} from './type';

export class List<T>{
  private static readonly DEFAULT_CAPACITY = 10;
  private _capacity : number = List.DEFAULT_CAPACITY;
  private repo : T[] = new Array(List.DEFAULT_CAPACITY);
  private index : number = -1;

  public constructor(...items : T[]){
    items
      .filter(item => item !== undefined)
      .filter(item => item !== null)
      .forEach((item)=>this.add(item));
  }

  public add(item : T) {
    this.repo[++this.index] = item;
    this.increaseCapacityIfLack();
  }

  public get(index : number) {
    if (index > this.index) {
      console.error(`index : ${index} is large than size of list`);
    }
    return this.repo[index];
  }

  public remove(index : number) : boolean {
    if ( index < 0 || this.index < index ) {
      return false;
    }

    const needToCopySlice = this.repo.slice(index + 1);
    for ( let i = 0; i < needToCopySlice.length ; i++ ) {
      this.repo[i + index] = needToCopySlice[i];
    }
    this.repo[this.index--] = undefined;

    this.decreaseCapacityIfEnough();
    return true;
  }

  public removeByItem(item : T) : boolean {
    const targetIndex = this.repo.findIndex(_item => _item === item);
    return this.remove(targetIndex);
  }

  public forEach(fn : StreamCallback<T, void>) : void {
    this.values().forEach(fn);
  }

  public filter(fn : StreamCallback<T, void>) : T[] {
    return this.values().filter(fn);
  }

  public find(fn : StreamCallback<T, boolean>) : T {
    return this.values().find(fn);
  }

  public reduce<K>(fn : ReduceCallback<T, K>, initialValue? : K) {
    return this.values().reduce<K>(fn, initialValue)
  }

  public findIndex(fn : StreamCallback<T, boolean>) : number {
    return this.values().findIndex(fn);
  }

  public indexOf(item : T, fromIndex? : number) : number {
    return this.values().indexOf(item, fromIndex);
  }

  public lastIndexOf(item : T, fromIndex? : number) : number {
    return this.values().lastIndexOf(item, fromIndex);
  }

  public values() : T[] {
    return this.repo.slice(0, this.size());
  }

  public some(fn : StreamCallback<T, boolean>) : boolean {
    return this.values().some(fn);
  }

  public every(fn : StreamCallback<T, boolean>) : boolean {
    return this.values().every(fn);
  }

  public size() : number {
    return this.index + 1;
  }

  public capacity() : number {
    return this._capacity;
  }

  public sort(fn? : CompareCallback<T>) : void {
    this.values().sort(fn);
  }

  public includes(item : T, fromIndex? : number) : boolean {
    return this.values().includes(item, fromIndex);
  }

  public addAll(items : List<T> | T[]) : void {
    if ( items instanceof Array ){
      items = new List<T>(...items);
    }
    items.forEach(item => this.add(item));
  }

  public subList(startIndex : number, endIndex? :number) : List<T> {
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
      const newCapacity = this.capacity()/2;
      this.setNewCapacity(newCapacity);
    }
  }

  private setNewCapacity(newCapacity : number) {
    this._capacity   = newCapacity;
    this.repo.length = newCapacity;
  }

  public toString() : string {
    return `[${this.values().toString()}]`
  }
}
