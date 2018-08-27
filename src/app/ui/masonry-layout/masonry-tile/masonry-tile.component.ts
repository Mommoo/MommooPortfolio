import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'mommoo-masonry-tile',
  templateUrl: './masonry-tile.component.html',
  styleUrls: ['./masonry-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryTile implements AfterViewChecked, OnInit, OnChanges {

  private _colSpan : number = 1;

  constructor(private hostElementRef : ElementRef) {

  }

  @Input()
  public set colSpan(_colSpan : number) {
    this._colSpan = Math.max(1, _colSpan);
  }

  public get colSpan() : number{
    return this._colSpan;
  }

  public setStyles(style : {}) : void {
    Object.assign(this.hostElementRef.nativeElement.style, style);
  }

  public getHeight() : number {
    return this.hostElementRef.nativeElement.offsetHeight;
  }

  ngOnInit(): void {
    console.log('[masonry-tile] onInit');
  }

  ngAfterViewChecked(): void {
    console.log('[masonry-tile] ngAfterViewChecked');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('[masonry-tile] ngOnChanges');
  }
}
