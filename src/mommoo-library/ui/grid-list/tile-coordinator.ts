import {MommooGridTile} from './grid-tile/grid-tile.component';

export interface TilePosition {
  x : number ,y : number
}

export interface ComputeResult {
  positions : TilePosition[],
  numRows : number
}

export class TileCoordinator {

  private findCollisionLastIndex(tracker : Array<number>, beginIndex : number, endIndex : number, numRows : number) : number {
    const foundIndex = [...tracker]
      .slice(beginIndex, endIndex)
      .reverse()
      .findIndex(value=> value > numRows);

    return foundIndex === -1 ? -1 : beginIndex + foundIndex;
  }

  private findNextCoordination(tracker : Array<number>, currentX : number, numRows : number) : [number, number] {
    while (true) {
      const foundIndex = tracker
        .slice(currentX)
        .findIndex(value => value <= numRows);

      if ( foundIndex !== -1 ) {
        return [currentX + foundIndex, numRows];
      }

      currentX = 0;
      numRows++;
    }
  }

  private computeCoordination(tracker : Array<number>, colSpan : number, oldX : number, oldY : number) : [number, number] {
    const maxColumnNum = tracker.length;
    let currentX = oldX, currentY = oldY;
    while ( true ) {
      [currentX, currentY] = this.findNextCoordination(tracker, currentX, currentY);

      const isOutOfColumn = maxColumnNum < currentX + colSpan;
      if ( isOutOfColumn ) {
        currentX = 0;
        currentY ++;
        continue;
      }

      const collisionLastIndex = this.findCollisionLastIndex(tracker, currentX, currentX + colSpan, currentY);

      if ( collisionLastIndex !== -1 ) {
        currentX = collisionLastIndex + 1;
        continue;
      }

      return [currentX, currentY];
    }
  }

  public compute(maxColumnNum : number, tiles : Array<MommooGridTile>) : ComputeResult {
    const tracker : number[] = new Array(maxColumnNum).fill(-1, 0, maxColumnNum);
    let oldX = 0, oldY = 0;

    const positions: TilePosition[] = tiles.map(item => {
      const colSpan = item.getColSpan();
      const rowSpan = item.getRowSpan();

      const [currentX, currentY] = this.computeCoordination(tracker, colSpan, oldX, oldY);

      tracker.fill(currentY + rowSpan, currentX, currentX + colSpan);
      oldX = currentX + colSpan;
      oldY = currentY;

      return {x: currentX, y: currentY};
    });

    return {
      positions,
      numRows: Math.max(...tracker)
    }
  }
}
