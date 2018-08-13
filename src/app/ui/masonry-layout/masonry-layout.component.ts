import {
  AfterViewChecked, AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DoCheck,
  ElementRef,
  Input,
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
export class MommooMasonryLayout implements AfterViewChecked, DoCheck, AfterViewInit{

  @ViewChild('paddingWrapper')
  private paddingWrapper : ElementRef;

  @ContentChildren(MommooMasonryTile)
  private masonryTileQueryList : QueryList<MommooMasonryTile>;

  @Input() private maxColumnNum : number = 4;
  @Input() private gutterSize   : number = 10;

  private readonly masonryStyler : MasonryStyler = new MasonryStyler(this.maxColumnNum, this.gutterSize);

  constructor() {

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

    this.masonryStyler.setTiles(this.masonryTileQueryList.toArray());

    WindowUtils.addDoneResizingEvent('masonryLayout', ()=> this.ngAfterViewChecked());
  }

  //TODO tile이 바뀌었는지를 어케 알것인가?
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked!');
    this.masonryStyler.setProperty(this.maxColumnNum, this.gutterSize);
    const computedContainerHeight = this.masonryStyler.doMasonryLayout();
    const paddingValue = MommooMasonryLayout.paddingValue();
    this.nativePaddingWrapperElement().style.height = `${computedContainerHeight + (paddingValue*2)}px`;
  }

  ngDoCheck(): void {
    console.log("doCheck!!");
  }

}
