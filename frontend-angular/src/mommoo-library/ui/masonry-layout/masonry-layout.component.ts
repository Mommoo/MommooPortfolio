import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MommooMasonryTile} from './masonry-tile/masonry-tile.component';
import {DomUtils} from '../../util/dom';
import {WindowSizeEventHandler} from '../../handler/window/size/window-size-handler';
import {MasonryRenderer} from './masonry-renderer';

@Component({
  selector: 'mommoo-masonry-layout',
  templateUrl: './masonry-layout.component.html',
  styleUrls: ['./masonry-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// TODO Masonry Tile이 하나 추가 되면, 전부 로딩해야 하는 구조. 추가 된 카드만 크기를 구하고.. layout만 하는 코드가 필요함.
export class MommooMasonryLayout implements OnInit, AfterViewInit, AfterContentChecked, OnChanges, OnDestroy {
  private static readonly DEFAULT_PADDING = DomUtils.getScrollbarWidth() / 2;
  private masonryLayoutWindowDoneEventID;

  @ContentChildren(MommooMasonryTile)
  private masonryTileQueryList: QueryList<MommooMasonryTile>;

  @Input() private maxColumnNum = 4;
  @Input() private gutterSize = 10;

  private readonly masonryRenderer = new MasonryRenderer(this.maxColumnNum, this.gutterSize);

  public constructor(private hostElementRef: ElementRef<HTMLElement>) {

  }

  private isFirstChanged = true;

  public ngOnChanges(changes: SimpleChanges): void {
    if ( this.isFirstChanged ) {
      this.isFirstChanged = false;
      return;
    }
    
    this.paintMasonryTiles();
    this.layoutMasonryTiles();
  }

  public ngOnInit(): void {
    DomUtils.applyStyle(this.hostElementRef, {
      padding: `${MommooMasonryLayout.DEFAULT_PADDING}px`,
      opacity: 0
    });
  }

  public ngAfterViewInit(): void {
    this.masonryLayoutWindowDoneEventID = WindowSizeEventHandler.addDoneResizingEvent(() => {
      this.paintMasonryTiles();
      this.layoutMasonryTiles();
    }, 400, true);
  }

  public ngAfterContentChecked(): void {
    if ( !this.masonryTileQueryList ) {
      return;
    }
    this.masonryRenderer.initialize(this.masonryTileQueryList.toArray(), this.maxColumnNum, this.gutterSize);
    this.masonryTileQueryList
      .toArray()
      .filter(tile => tile.colSpan > this.maxColumnNum)
      .forEach(tile => {
        throw new Error(`tile span '${tile.colSpan}' is can not be longer than max column '${this.maxColumnNum}' `);
      });
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvent(this.masonryLayoutWindowDoneEventID);
  }

  public paintMasonryTiles(): void {
    this.masonryRenderer.paint();
  }

  public layoutMasonryTiles(): void {
    const containerHeight = this.masonryRenderer.doMasonryLayout();
    const computedLayoutHeight = containerHeight + (MommooMasonryLayout.DEFAULT_PADDING * 2);
    DomUtils.applyStyle(this.hostElementRef, {
      height: `${computedLayoutHeight}px`,
      opacity: 1
    });
  }
}
