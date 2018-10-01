import {MommooGridTile} from './grid-tile/grid-tile.component';
import {TilePosition} from './tile-coordinator';

export abstract class StyleProvider {
  protected constructor(private maxColumnNum : number,
                        private colGap : number,
                        private rowGap : number){
  }

  protected getMaxColumnNum() : number {
    return this.maxColumnNum;
  }

  protected getRowGap() : number {
    return this.rowGap;
  }

  protected getColGap() : number {
    return this.colGap;
  }

  protected static wrapCalc(express : string) {
    return `calc(${express})`;
  }

  protected get1x1TileWidth() : string {
    return `((100% - ${this.colGap * (this.maxColumnNum - 1)}px)/${this.maxColumnNum})`;
  }

  protected getGridTileSize(size : string, span : number) : string {
    return `${size} * ${span} + ${this.colGap * (span - 1)}px`
  }

  public abstract getTileLayoutStyle(colspan : number, rowspan : number, position : TilePosition) : {}

  public abstract getGridListLayoutStyle(numRows : number) : {};
}

export class FixedStyleProvider extends StyleProvider {
  public constructor(private rowHeight : number,
                     maxColumnNum : number, colGap : number, rowGap : number) {
    super(maxColumnNum, colGap, rowGap);
  }

  protected get1x1TileHeight(): string {
    return `${this.rowHeight}px`;
  }

  getTileLayoutStyle(colspan : number, rowspan : number, position : TilePosition): {} {
    return {
      width  : StyleProvider.wrapCalc(this.getGridTileSize(this.get1x1TileWidth(), colspan)),
      height : StyleProvider.wrapCalc(this.getGridTileSize(this.get1x1TileHeight(), rowspan)),
      top    : StyleProvider.wrapCalc(`${this.get1x1TileHeight()} * ${position.y} + ${this.getRowGap() * position.y}px`),
      left   : StyleProvider.wrapCalc(`(${this.get1x1TileWidth()} * ${position.x} + ${this.getColGap() * position.x}px)`)
    }
  }

  getGridListLayoutStyle(numRows : number): {} {
    return {
      height : `${(this.rowHeight * numRows) + (this.getRowGap() * numRows - 1)}px`
    };
  }
}

export class RatioStyleProvider extends StyleProvider {
  public constructor(private ratioNum : number, maxColumnNum : number, colGap : number, rowGap : number){
    super(maxColumnNum, colGap, rowGap);
  }

  private get1x1TileHeight(): string {
    return `${this.get1x1TileWidth()} * ${this.ratioNum}`;
  }

  getTileLayoutStyle(colspan : number, rowspan : number, position : TilePosition): {} {
    return {
      width  : StyleProvider.wrapCalc(this.getGridTileSize(this.get1x1TileWidth(), colspan)),
      paddingBottom : StyleProvider.wrapCalc(this.get1x1TileHeight()),
      marginTop     : StyleProvider.wrapCalc(`(${this.get1x1TileHeight()} * ${position.y}) + ${this.getRowGap() * position.y}px`),
      left   : StyleProvider.wrapCalc(`(${this.get1x1TileWidth()} * ${position.x} + ${this.getColGap() * position.x}px)`)
    };
  }

  getGridListLayoutStyle(numRows : number): {} {
    return {
      paddingBottom : StyleProvider.wrapCalc(`${this.get1x1TileHeight()} * ${numRows} + (${this.getRowGap() * (numRows - 1)}px)`)
    }
  }
}
