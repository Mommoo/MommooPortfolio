import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {ResolveProxy} from './common.types';

/**
 * For performance, this class is provides
 * that after caching a data resolved by 'Resolver Service Instance',
 * when in next time of requesting load data,
 * instead of trying data load again return cached data.
 */
export abstract class CacheResolver<T> implements Resolve<T>, OnDestroy {
  private cacheMap = new Map<string, T>();

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | T {
    const {cacheKey, createObservable} = this.createResolveProxy(route, state);

    if ( this.cacheMap.has(cacheKey) ) {
      return this.cacheMap.get(cacheKey);
    }

    const observable = createObservable();

    const subscription =
      observable.subscribe(value => {
        this.cacheMap.set(cacheKey, value);
        subscription.unsubscribe();
      });

    return observable;
  }

  protected abstract createResolveProxy(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResolveProxy<T>;

  public ngOnDestroy(): void {
    this.cacheMap.clear();
    this.cacheMap = null;
  }
}
