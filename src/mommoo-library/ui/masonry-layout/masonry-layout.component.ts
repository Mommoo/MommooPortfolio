import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
import {MasonryStyler} from './masonry-styler';
import {DomUtils} from '../../util/dom';
import {WindowEventHandler} from '../../handler/window/window-event';

@Component({
  selector: 'mommoo-masonry-layout',
  templateUrl: './masonry-layout.component.html',
  styleUrls: ['./masonry-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryLayout implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private static readonly DEFAULT_PADDING = DomUtils.getScrollbarWidth();
  private masonryLayoutWindowDoneEventID;

  @ViewChild('paddingWrapper')
  private paddingWrapper : ElementRef<HTMLElement>;

  @ContentChildren(MommooMasonryTile)
  private masonryTileQueryList : QueryList<MommooMasonryTile>;

  @Input() private maxColumnNum : number = 4;
  @Input() private gutterSize   : number = 10;

  @Input()
  private set layoutTiles(isLayoutTiles : boolean) {
    if ( isLayoutTiles ) {
      this.layoutMasonryTiles();
      this.setStyleToPaddingWrapperElem('opacity', '1');
      this.changeDetector.detectChanges();
    }
  }

  private readonly masonryStyler : MasonryStyler = new MasonryStyler(this.maxColumnNum, this.gutterSize);

  constructor(private changeDetector : ChangeDetectorRef) {
  }

  private isFirstChanged = true;
  ngOnChanges(changes: SimpleChanges): void {
    if ( this.isFirstChanged ) {
      this.isFirstChanged = false;
      return;
    }
    this.layoutMasonryTiles();
  }

  ngOnInit(): void {
    this.setStyleToPaddingWrapperElem('opacity', '0');
  }

  ngAfterViewInit(): void {
    this.setStyleToPaddingWrapperElem('padding', `${MommooMasonryLayout.DEFAULT_PADDING}px`);
    this.masonryLayoutWindowDoneEventID = WindowEventHandler.addDoneResizingEvent(()=> this.layoutMasonryTiles());
  }

  ngOnDestroy(): void {
    WindowEventHandler.removeEvent(this.masonryLayoutWindowDoneEventID);
  }

  private setStyleToPaddingWrapperElem(propName : string, propValue : string) {
    this.paddingWrapper.nativeElement.style[propName] = propValue;
  }

  private layoutMasonryTiles() : void {
    if ( this.isInValidCondition() ) {
      return;
    }

    this.masonryStyler.initialize(this.masonryTileQueryList.toArray(), this.maxColumnNum, this.gutterSize);
    const containerHeight = this.masonryStyler.doMasonryLayout();
    const computedLayoutHeight = containerHeight + (MommooMasonryLayout.DEFAULT_PADDING * 2);
    this.setStyleToPaddingWrapperElem('height', `${computedLayoutHeight}px`);
  }

  private isInValidCondition() {
    if ( !this.masonryTileQueryList ) {
      return true;
    }

    this.masonryTileQueryList
      .toArray()
      .filter(tile => tile.colSpan > this.maxColumnNum)
      .forEach(tile => {
        throw new Error(`tile span '${tile.colSpan}' is can not be longer than max column '${this.maxColumnNum}' `);
      });

    return false;
  }
}
