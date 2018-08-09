import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {CardActionButtonProperty} from '../data-type';

@Component({
  selector: 'mommoo-action-view',
  templateUrl: './action-view.component.html',
  styleUrls: ['./action-view.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooActionView {

  @Input() actionButtonProps : Array<CardActionButtonProperty>;

  @Input() themeColor : string;

  @Output() actionEventEmitter : EventEmitter<string> = new EventEmitter();

  @ViewChildren('buttons') buttons : QueryList<HTMLDivElement>;

  constructor() { }

  buttonClicks(buttonName) : void {
    this.actionEventEmitter.emit(buttonName);
  }
}
