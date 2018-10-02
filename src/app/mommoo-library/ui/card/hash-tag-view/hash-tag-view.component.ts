import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {StyledTextContentContainer} from '../../common/component/styled-text-content-container.component';

@Component({
  selector: 'mommoo-hash-tag-view',
  templateUrl: './hash-tag-view.component.html',
  styleUrls: ['./hash-tag-view.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MommooHashTagView extends StyledTextContentContainer {

  @Input()
  public backgroundColor : string = 'white';

  constructor() {
    super();
  }
}
