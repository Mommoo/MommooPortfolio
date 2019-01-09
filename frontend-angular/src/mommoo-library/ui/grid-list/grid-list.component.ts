import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MommooGridTile} from './grid-tile/grid-tile.component';
import {TileCoordinator} from './tile-coordinator';
import {FixedStyleProvider, RatioStyleProvider, StyleProvider} from './style-provider';
import {from, zip} from 'rxjs';
import {DomUtils} from '../../util/dom';

@Component({
  selector: 'mommoo-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooGridList implements AfterContentInit, OnChanges {

  @Input()
  private rowHeight = '100px';

  @Input()
  private maxColumnNum = 4;

  @Input()
  private colGap = 10;

  @Input()
  private rowGap = 10;

  @ContentChildren(MommooGridTile)
  private gridTileQueryList: QueryList<MommooGridTile>;

  @ViewChild('viewport', {read: ElementRef})
  private viewport: ElementRef<HTMLElement>;

  private isFirstChanged = true;

  constructor() {

  }

  public ngAfterContentInit(): void {
    if (this.gridTileQueryList && this.gridTileQueryList.toArray()) {
      this.layoutTiles();
    }

    this.gridTileQueryList.changes.subscribe(() => this.layoutTiles());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ( this.isFirstChanged ) {
      this.isFirstChanged = false;
    } else {
      this.layoutTiles();
    }
  }

  private getProperStyleProvider(): StyleProvider {
    if ( this.rowHeight.includes('px') ) {
      const intRowHeight = parseInt(this.rowHeight);
      return new FixedStyleProvider(intRowHeight, this.maxColumnNum, this.colGap, this.rowGap);
    }

    if ( this.rowHeight.includes(':') ) {
      const ratioNum = parseInt(this.rowHeight.split(":")[0]);
      return new RatioStyleProvider(ratioNum, this.maxColumnNum, this.colGap, this.rowGap);
    }
  }

  private layoutTiles(): void {
    const computedResult = new TileCoordinator().compute(this.maxColumnNum, this.gridTileQueryList.toArray());
    const styleProvider  = this.getProperStyleProvider();
    const viewportStyle = styleProvider.getViewportStyle(computedResult.numRows);
    DomUtils.applyStyle(this.viewport, viewportStyle);

    const tile$ = from(this.gridTileQueryList.toArray());
    const tilePositions$ = from(computedResult.positions);

    zip(tile$, tilePositions$).pipe().subscribe({
      next : value => {
        const [tile, position] = value;
        const tileElementStyle = styleProvider.getTileLayoutStyle(tile.getColSpan(), tile.getRowSpan(), position);
        Object.assign(tile.nativeElement().style, tileElementStyle);
      }
    });
  }
}
