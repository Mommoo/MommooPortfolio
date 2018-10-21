import {MommooMasonryTile} from './masonry-tile/masonry-tile.component';

export class MasonryRenderer {
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

  public initialize(masonryTileList: MommooMasonryTile[], maxColumnNum: number, gutterSize: number) {
    this.masonryTileList = masonryTileList;
    this.maxColumnNum = maxColumnNum;
    this.gutterSize = gutterSize;
  }

  public paint() {
    this.masonryLayoutPropsFinder.initialize(this.maxColumnNum, this.gutterSize);
    this.masonryTileList.forEach(tile => tile.setStyles({width: this.computeColumnWidth(tile.colSpan)}));
  }

  /** Warning!! layout method is be affected paint method */
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
  private trackerSet = new Set<number>();
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
    /** remove duplicated value */
    this.tracker.forEach(stockHeight=> this.trackerSet.add(stockHeight));
    const distinctTracker: number[] = Array.from(this.trackerSet);
    this.trackerSet.clear();
    return distinctTracker.sort((a, b) => a - b);
  }

  private findProperColumnIndex(stockHeight: number, colSpan: number): number {
    const maxColumnSize = this.tracker.length;
    let startIndex = 0;

    const isNotOverEndColumn = () => startIndex + colSpan <= maxColumnSize;

    while (isNotOverEndColumn()) {
      const needToCheckTrackerSlice = this.tracker.slice(startIndex, startIndex + colSpan);
      let interruptedIndex = -1;
      for (let index = 0; index < needToCheckTrackerSlice.length; index++) {
        const checkStockHeight = needToCheckTrackerSlice[index];
        if ( checkStockHeight > stockHeight ) {
          interruptedIndex = index;
          break;
        }
      }
      const isInterruptedToAnotherTile = interruptedIndex !== -1;
      if ( isInterruptedToAnotherTile ) {
        startIndex += interruptedIndex + 1;
        continue;
      }

      return startIndex;
    }

    return -1;
  }

  public computeTilePosition(tile: MommooMasonryTile): [number, number] {
    const [columnIndex, top] = this.findProperPosition(tile.colSpan);
    const h = tile.getOffsetHeight();
    const needToFillValue = top + h + this.gutterSize;
    this.tracker.fill(needToFillValue, columnIndex, columnIndex + tile.colSpan);
    return [columnIndex, top];
  }

  public computeLayoutHeight() {
    return Math.max(...this.tracker);
  }
}
