import {Observable} from 'rxjs';

export interface ResolveProxy<T> {
  readonly cacheKey: string;
  createObservable(): Observable<T>;
}
