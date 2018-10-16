import {MommooMasonryTile} from './masonry-tile/masonry-tile.component';

export class MasonryStyler {
  private readonly masonryLayoutPropsFinder: MasonryLayoutPropsFinder;
  private masonryTileList: MommooMasonryTile[];

  constructor(private maxColumnNum: number,
              private gutterSize: number) {
    this.masonryLayoutPropsFinder = new MasonryLayoutPropsFinder(this.maxColumnNum, this.gutterSize);
  }

  private calcExpressOfUnitWidth(): string {
    return `((100% - ${this.gutterSize * (this.maxColumnNum - 1)}px) / ${this.maxColumnNum})`;
  }

  private computeColumnWidth(colSpan: number): string {
    return `calc((${this.calcExpressOfUnitWidth()} * ${colSpan}) + ${this.gutterSize * (colSpan - 1)}px)`;
  }

  private computeLeft(columnIndex: number): string {
    return `calc((${this.calcExpressOfUnitWidth()} * ${columnIndex}) + ${this.gutterSize * (columnIndex)}px)`;
  }

  // this code line have to operate first than next code lines
  // because at next code lines, using element height that is changed when element width changing
  public initialize(masonryTileList: MommooMasonryTile[], maxColumnNum: number, gutterSize: number) {
    this.masonryTileList = masonryTileList;
    this.maxColumnNum = maxColumnNum;
    this.gutterSize = gutterSize;
    this.masonryLayoutPropsFinder.initialize(maxColumnNum, gutterSize);
    masonryTileList.forEach(tile => tile.setStyles({width: this.computeColumnWidth(tile.colSpan)}));
  }

  public doMasonryLayout(): number {
    // this code lines use element height that is changed when element width changing
    this.masonryTileList.forEach(tile => {
      const [columnIndex, top] = this.masonryLayoutPropsFinder.computeTilePosition(tile);
      tile.setStyles({
        left: this.computeLeft(columnIndex),
        top: `${top}px`
      });
    });

    return this.masonryLayoutPropsFinder.computeLayoutHeight();
  }
}

class MasonryLayoutPropsFinder {
  private tracker;

  constructor(maxColumnNum: number, private gutterSize: number) {
    this.tracker = new Array(maxColumnNum).fill(0, 0, maxColumnNum);
  }

  public initialize(maxColumnNum: number, gutterSize: number) {
    this.tracker = new Array(maxColumnNum).fill(0, 0, maxColumnNum);
    this.gutterSize = gutterSize;
  }

  private findProperPosition(colSpan: number): [number, number] {
    const ascendingDistinctTracker = this.computeAscendingDistinctTracker();

    for ( let index = 0; index < ascendingDistinctTracker.length ; index++ ) {
      const stockHeight = ascendingDistinctTracker[index];
      const properColumnIndex = this.findProperColumnIndex(stockHeight, colSpan);
      if ( properColumnIndex !== -1 ) {
        return [properColumnIndex, stockHeight];
      }
    }
    const maxStockHeight = ascendingDistinctTracker[ascendingDistinctTracker.length - 1];
    return [0, maxStockHeight];
  }

  private computeAscendingDistinctTracker() {
    const distinctTracker: Array<number> = Array.from(new Set(this.tracker)) as Array<number>;
    return distinctTracker.sort((a, b) => a - b);
  }

  private findProperColumnIndex(stockHeight: number, colSpan: number): number {
    const maxColumnSize = this.tracker.length;
    let startIndex = 0;

    const isNotOverEndColumn = () => startIndex + colSpan <= maxColumnSize;

    while (isNotOverEndColumn()) {
      const isInterruptedToAnotherTile =
        this.tracker.slice(startIndex, startIndex + colSpan)
          .filter(value => value > stockHeight).length !== 0;

      if ( isInterruptedToAnotherTile ) {
        startIndex += colSpan;
        continue;
      }

      return startIndex;
    }

    return -1;
  }

  public computeTilePosition(tile: MommooMasonryTile): [number, number] {
    const [columnIndex, top] = this.findProperPosition(tile.colSpan);
    const h = tile.getOffsetHeight();
    // console.log(h);
    const needToFillValue = top + h + this.gutterSize;
    this.tracker.fill(needToFillValue, columnIndex, columnIndex + tile.colSpan);
    return [columnIndex, top];
  }

  public computeLayoutHeight() {
    return Math.max(...this.tracker);
  }
}
