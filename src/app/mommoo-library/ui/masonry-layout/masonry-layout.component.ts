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
import {StyleUtils} from '../../util/style';
import {WindowEventHandler} from '../../handler/window/window-event';

@Component({
  selector: 'mommoo-masonry-layout',
  templateUrl: './masonry-layout.component.html',
  styleUrls: ['./masonry-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryLayout implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private static ID_INDEX = 0;
  private static readonly DEFAULT_PADDING = StyleUtils.getScrollbarWidth();
  private readonly WINDOW_DONE_EVENT_ID;

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

  constructor(private changeDetector     : ChangeDetectorRef) {

    MommooMasonryLayout.ID_INDEX++;
    this.WINDOW_DONE_EVENT_ID = `masonryLayout${MommooMasonryLayout.ID_INDEX}`;
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
    WindowEventHandler.addDoneResizingEvent(this.WINDOW_DONE_EVENT_ID, ()=> this.layoutMasonryTiles());
  }

  ngOnDestroy(): void {
    WindowEventHandler.removeEvent(this.WINDOW_DONE_EVENT_ID);
  }

  private setStyleToPaddingWrapperElem(propName : string, propValue : string) {
    this.paddingWrapper.nativeElement.style[propName] = propValue;
  }

  private layoutMasonryTiles() : void {
    if ( !this.masonryTileQueryList ) {
      return;
    }
    this.masonryStyler.initialize(this.masonryTileQueryList.toArray(), this.maxColumnNum, this.gutterSize);
    const containerHeight = this.masonryStyler.doMasonryLayout();
    const computedLayoutHeight = containerHeight + (MommooMasonryLayout.DEFAULT_PADDING * 2);
    this.setStyleToPaddingWrapperElem('height', `${computedLayoutHeight}px`);
  }
}
