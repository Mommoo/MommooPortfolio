import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'mommoo-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooGridTile {
  @Input()
  private colSpan : number = 1;

  @Input()
  private rowSpan : number = 1;

  constructor(private hostElementRef : ElementRef) {
  }

  public getColSpan() : number {
    return this.colSpan;
  }

  public getRowSpan() : number {
    return this.rowSpan;
  }

  public nativeElement() {
    return this.hostElementRef.nativeElement;
  }
}
