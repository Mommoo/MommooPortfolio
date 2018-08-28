import {MommooMasonryTile} from './masonry-tile/masonry-tile.component';

export class MasonryStyler {
  private readonly masonryLayoutPropsFinder : MasonryLayoutPropsFinder;
  private masonryTileList : MommooMasonryTile[];

  constructor(private maxColumnNum : number,
              private gutterSize : number) {
    this.masonryLayoutPropsFinder = new MasonryLayoutPropsFinder(this.maxColumnNum, this.gutterSize);
  }

  private calcExpressOfUnitWidth() : string {
    return `((100% - ${this.gutterSize * (this.maxColumnNum - 1)}px) / ${this.maxColumnNum})`;
  }

  private computeColumnWidth(colSpan : number) : string {
    return `calc((${this.calcExpressOfUnitWidth()} * ${colSpan}) + ${this.gutterSize * (colSpan - 1)}px)`;
  }

  private computeLeft(columnIndex : number) : string {
    return `calc((${this.calcExpressOfUnitWidth()} * ${columnIndex}) + ${this.gutterSize * (columnIndex)}px)`;
  }

  // this code line have to operate first than next code lines
  // because at next code lines, using element height that is changed when element width changing
  public setTiles(masonryTileList : MommooMasonryTile[]) {
    this.masonryTileList = masonryTileList;
    masonryTileList.forEach(tile => tile.setStyles({width : this.computeColumnWidth(tile.colSpan)}));
  }

  public setProperty(maxColumnNum : number, gutterSize : number) {
    this.maxColumnNum = maxColumnNum;
    this.gutterSize = gutterSize;
    this.masonryLayoutPropsFinder.initialize(maxColumnNum, gutterSize);
  }

  public doMasonryLayout() : number {
    // this code lines use element height that is changed when element width changing
    this.masonryTileList.forEach(tile => {
      const [columnIndex, top] = this.masonryLayoutPropsFinder.computeTilePosition(tile);
      tile.setStyles({
        left : this.computeLeft(columnIndex),
        top  : `${top}px`
      });
    });

    return this.masonryLayoutPropsFinder.computeLayoutHeight();
  }
}

class MasonryLayoutPropsFinder {
  private tracker;

  constructor(maxColumnNum : number, private gutterSize : number) {
    this.tracker = new Array(maxColumnNum).fill(0, 0, maxColumnNum);
  }

  public initialize(maxColumnNum : number, gutterSize : number) {
    this.tracker = new Array(maxColumnNum).fill(0, 0, maxColumnNum);
    this.gutterSize = gutterSize;
  }

  private findProperColumnIndex(colSpan : number) : number {
    const distinctTracker : Array<number> = Array.from(new Set(this.tracker)) as Array<number>;
    const ascendingDistinctTracker = distinctTracker.sort((a, b) => a-b);
    for ( let i = 0; i < ascendingDistinctTracker.length ; i++ ) {
      const columnIndex = this.tracker.indexOf(ascendingDistinctTracker[i]);
      if ( this.isEnoughWide(columnIndex, colSpan) ) {
        return columnIndex;
      }
    }

    return -1;
  }

  private isEnoughWide(columnIndex : number, colSpan : number) {
    const isOverEndColumn = columnIndex + colSpan > this.tracker.length;
    const isInterruptAnotherTile = this.tracker.slice(columnIndex, columnIndex + colSpan).filter(value => value > this.tracker[columnIndex]).length !== 0;
    return !isOverEndColumn && !isInterruptAnotherTile;
  }

  public computeTilePosition(tile : MommooMasonryTile) : [number, number] {
    const columnIndex = this.findProperColumnIndex(tile.colSpan);
    const top = this.tracker[columnIndex];
    const needToFillValue = this.tracker[columnIndex] + tile.getHeight() + this.gutterSize;
    this.tracker.fill(needToFillValue, columnIndex, columnIndex + tile.colSpan);
    return [columnIndex, top];
  }

  public computeLayoutHeight() {
    return Math.max(...this.tracker);
  }
}
