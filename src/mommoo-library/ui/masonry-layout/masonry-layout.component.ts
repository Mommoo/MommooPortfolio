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
import {WindowEventHandler} from '../../handler/window/window-event';
import {MasonryRenderer} from './masonry-renderer';

@Component({
  selector: 'mommoo-masonry-layout',
  templateUrl: './masonry-layout.component.html',
  styleUrls: ['./masonry-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryLayout implements OnInit, AfterViewInit, AfterContentChecked, OnChanges, OnDestroy {
  private static readonly DEFAULT_PADDING = DomUtils.getScrollbarWidth();
  private masonryLayoutWindowDoneEventID;

  @ViewChild('paddingWrapper')
  private paddingWrapper : ElementRef<HTMLElement>;

  @ContentChildren(MommooMasonryTile)
  private masonryTileQueryList : QueryList<MommooMasonryTile>;

  @Input() private maxColumnNum : number = 4;
  @Input() private gutterSize   : number = 10;

  private readonly masonryRenderer : MasonryRenderer = new MasonryRenderer(this.maxColumnNum, this.gutterSize);

  public constructor() {

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
    DomUtils.applyStyle(this.paddingWrapper, {
      padding: `${MommooMasonryLayout.DEFAULT_PADDING}px`,
      opacity: 0
    });
  }

  public ngAfterViewInit(): void {
    this.masonryLayoutWindowDoneEventID = WindowEventHandler.addDoneResizingEvent(()=> {
      this.paintMasonryTiles();
      this.layoutMasonryTiles();
    }, true);
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
    WindowEventHandler.removeEvent(this.masonryLayoutWindowDoneEventID);
  }

  public paintMasonryTiles(): void {
    this.masonryRenderer.paint();
  }

  public layoutMasonryTiles() : void {
    const containerHeight = this.masonryRenderer.doMasonryLayout();
    const computedLayoutHeight = containerHeight + (MommooMasonryLayout.DEFAULT_PADDING * 2);
    DomUtils.applyStyle(this.paddingWrapper, {
      height: `${computedLayoutHeight}px`,
      opacity: 1
    });
  }
}
