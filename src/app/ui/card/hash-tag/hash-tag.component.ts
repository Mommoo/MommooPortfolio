import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'mommoo-hash-tag',
  templateUrl: './hash-tag.component.html',
  styleUrls: ['./hash-tag.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooHashTag {

  @Input()
  public message : string = "";

  @HostBinding("style.backgroundColor")
  @Input()
  private color : string;

  constructor() { }

}
