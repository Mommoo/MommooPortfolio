import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'view-contents',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentsComponent {

}

@Component({
  selector: 'view-main',
  template : '<view-profile></view-profile>' +
    '<view-about></view-about>' +
    '<view-portfolio></view-portfolio>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

}
