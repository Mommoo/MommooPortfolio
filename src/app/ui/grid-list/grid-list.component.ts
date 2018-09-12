import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges
} from '@angular/core';
import {MommooGridTile} from './grid-tile/grid-tile.component';
import {TileCoordinator} from './tile-coordinator';
import {FixedStyleProvider, RatioStyleProvider, StyleProvider} from './style-provider';
import {from, zip} from 'rxjs';

@Component({
  selector: 'mommoo-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooGridList implements AfterViewInit, DoCheck, OnChanges, AfterViewChecked{

  @Input()
  private rowHeight : string = '100px';

  @Input()
  private maxColumnNum : number = 4;

  @Input()
  private colGap : number = 10;

  @Input()
  private rowGap : number=  10;

  @ContentChildren(MommooGridTile) gridTileQueryList : QueryList<MommooGridTile>;

  constructor(private hostElementRef : ElementRef) {

  }

  ngAfterViewInit(): void {

  }


  ngDoCheck(): void {
    console.log('doCheck');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanged');
  }

  ngAfterViewChecked(): void {
    console.log('afterViewChecked');
    this.layoutTiles();
  }

  private getProperStyleProvider() : StyleProvider {
    if ( this.rowHeight.includes('px') ) {
      const intRowHeight : number = parseInt(this.rowHeight);
      return new FixedStyleProvider(intRowHeight, this.maxColumnNum, this.colGap, this.rowGap);
    }

    if ( this.rowHeight.includes(':') ) {
      const ratioNum : number = parseInt(this.rowHeight.split(":")[0]);
      return new RatioStyleProvider(ratioNum, this.maxColumnNum, this.colGap, this.rowGap);
    }
  }

  private nativeElement() : HTMLElement {
    return this.hostElementRef.nativeElement;
  }

  private layoutTiles() : void {
    const computedResult = new TileCoordinator().compute(this.maxColumnNum, this.gridTileQueryList.toArray());
    const styleProvider  = this.getProperStyleProvider();
    const gridListElemStyle = styleProvider.getGridListLayoutStyle(computedResult.numRows);
    Object.assign(this.nativeElement().style, gridListElemStyle);

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
