import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'view-limited-textarea',
  templateUrl: './limited-textarea.component.html',
  styleUrls: ['./limited-textarea.component.scss']
})
export class LimitedTextareaComponent implements OnInit {
  private _text : string = "";
  @Input() limitNumber : number = 30;

  @Input()
  set text(text : string) {
    this._text = text;
  }

  get text() : string {
    return this._text.substring(0, this.limitNumber) + '...';
  }

  constructor() { }

  ngOnInit() {
  }

}
