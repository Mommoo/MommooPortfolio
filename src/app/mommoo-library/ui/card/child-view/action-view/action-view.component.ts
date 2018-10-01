import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {StyledTextContentContainer} from '../../../common/component/styled-text-content-container.component';

@Component({
  selector: 'mommoo-action-view',
  templateUrl: './action-view.component.html',
  styleUrls: ['./action-view.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooActionView extends StyledTextContentContainer {

  @Input() textColor : string;

  @Output() actionEventEmitter : EventEmitter<string> = new EventEmitter();

  @ViewChildren('buttons') buttons : QueryList<HTMLDivElement>;

  constructor() {
    super();
  }

  buttonClicks(buttonName) : void {
    this.actionEventEmitter.emit(buttonName);
  }
}
