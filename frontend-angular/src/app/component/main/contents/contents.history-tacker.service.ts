import {Injectable, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Injectable()
export class ContentsHistoryTacker implements OnDestroy {
  private previousURL: string;
  private navigationEndURLSubscription: Subscription;

  public constructor(private router: Router) {
    this.navigationEndURLSubscription = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(e => (e as NavigationEnd).url),
      tap(console.log)
    ).subscribe(url => this.previousURL = url);
  }

  public ngOnDestroy(): void {
    this.navigationEndURLSubscription.unsubscribe();
  }

  public isExistPreviousHistory() {
    return this.previousURL !== undefined;
  }
}
