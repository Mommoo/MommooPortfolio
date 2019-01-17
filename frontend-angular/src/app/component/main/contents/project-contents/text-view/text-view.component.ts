import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextViewComponent {
  @Input('texts')
  private _texts: string;

  public constructor() { }

  public get texts() {
    return this._texts;
  }
}
