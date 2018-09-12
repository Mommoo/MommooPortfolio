import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild
} from '@angular/core';
import {MommooMasonryTile} from './masonry-tile/masonry-tile.component';
import {MasonryStyler} from './masonry-styler';
import {StyleUtils} from '../common/style/StyleUtils';
import {WindowUtils} from '../common/WindowUtils';

@Component({
  selector: 'mommoo-masonry-layout',
  templateUrl: './masonry-layout.component.html',
  styleUrls: ['./masonry-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryLayout implements AfterViewInit, OnDestroy {
  private static ID_INDEX = 0;
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
      this.changeDetector.detectChanges();
    }
  }

  private readonly masonryStyler : MasonryStyler = new MasonryStyler(this.maxColumnNum, this.gutterSize);

  constructor(private changeDetector : ChangeDetectorRef) {
    MommooMasonryLayout.ID_INDEX++;
    this.WINDOW_DONE_EVENT_ID = `'masonryLayout'${MommooMasonryLayout.ID_INDEX}`;
  }

  private nativePaddingWrapperElement() : HTMLElement {
    return this.paddingWrapper.nativeElement;
  }

  private static paddingValue() : number {
    return StyleUtils.getScrollbarWidth();
  }

  ngAfterViewInit(): void {
    Object.assign(this.nativePaddingWrapperElement().style, {
      padding : `${MommooMasonryLayout.paddingValue()}px`
    });

    WindowUtils.addDoneResizingEvent(this.WINDOW_DONE_EVENT_ID, ()=> this.layoutMasonryTiles());
  }

  private layoutMasonryTiles() : void {
    this.masonryStyler.setTiles(this.masonryTileQueryList.toArray());
    this.masonryStyler.setProperty(this.maxColumnNum, this.gutterSize);
    const computedContainerHeight = this.masonryStyler.doMasonryLayout();
    const paddingValue = MommooMasonryLayout.paddingValue();
    this.nativePaddingWrapperElement().style.height = `${computedContainerHeight + (paddingValue*2)}px`;
  }

  ngOnDestroy(): void {
    WindowUtils.removeEvent(this.WINDOW_DONE_EVENT_ID);
  }
}
