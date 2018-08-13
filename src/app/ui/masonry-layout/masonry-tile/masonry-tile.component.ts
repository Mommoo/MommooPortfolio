import {Component, OnInit, ChangeDetectionStrategy, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'mommoo-masonry-tile',
  templateUrl: './masonry-tile.component.html',
  styleUrls: ['./masonry-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryTile {

  private _colSpan : number = 1;

  constructor(private hostElementRef : ElementRef) { }

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
}
