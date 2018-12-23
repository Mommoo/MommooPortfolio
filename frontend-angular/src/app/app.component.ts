import {ChangeDetectionStrategy, Component} from '@angular/core';

/**
 * This is root component that provides viewport of router.
 * The router contents displayed by url condition.
 * {@see AppRouterModule}
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
