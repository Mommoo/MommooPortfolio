import {ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {NumberUtils} from '../../util/number';

@Component({
  selector: 'mommoo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MommooButton {
  @Output('rippleClick')
  private _rippleClick: EventEmitter<Event> = new EventEmitter();

  @Input('flat')
  private _flat: boolean = false;

  public get flat() {
    return this._flat;
  }

  public onRippleClick(event: Event){
    this._rippleClick.emit(event);
  }
}
