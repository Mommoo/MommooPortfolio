import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'view-contents',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsComponent {

}


