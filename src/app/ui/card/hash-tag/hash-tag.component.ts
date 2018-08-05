import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'mommoo-hash-tag',
  templateUrl: './hash-tag.component.html',
  styleUrls: ['./hash-tag.component.scss']
})
export class MommooHashTag {

  @Input()
  public message : string = "";

  @HostBinding("style.backgroundColor")
  @Input()
  private color : string = "rgb(0, 128, 0, 0.5)";

  constructor() { }

}
