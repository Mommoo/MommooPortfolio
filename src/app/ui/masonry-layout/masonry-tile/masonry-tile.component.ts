import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'mommoo-masonry-tile',
  templateUrl: './masonry-tile.component.html',
  styleUrls: ['./masonry-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooMasonryTile {

  private _colSpan : number = 1;
  @Input()
  public set colSpan(_colSpan : number) {
    this._colSpan = Math.max(1, _colSpan);
  }

  public get colSpan() : number{
    return this._colSpan;
  }

  public constructor(private hostElementRef : ElementRef) {

  }

  public setStyles(style : {}) : void {
    Object.assign(this.hostElementRef.nativeElement.style, style);
  }

  public getOffsetHeight() : number {
    return this.hostElementRef.nativeElement.offsetHeight;
  }
}
