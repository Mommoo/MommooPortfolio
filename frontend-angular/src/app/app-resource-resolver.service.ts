import {Injectable} from '@angular/core';
import {forkJoin, Observable, zip} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CacheResolver} from './common/cache-resolver';
import {AppResourceFinder} from './app.types';
import {ResolveProxy} from './common/common.types';
import {ResourceHttpClient} from './server/resource/resource-httpclient.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AppResourceResolver extends CacheResolver<AppResourceFinder> {
  public constructor(private resourceHttpClient: ResourceHttpClient) {
    super();
  }

  private createAppIconPathFinderObservable(): Observable<AppResourceFinder> {
    return forkJoin(
      this.resourceHttpClient.getImageResources(),
      this.resourceHttpClient.getFileResource(),
      this.resourceHttpClient.getAllPaperResources()
    ).pipe(
      map(value => ({
        icon: value[0],
        file: value[1],
        papers: value[2]
      }))
    );
  }

  protected createResolveProxy(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : ResolveProxy<AppResourceFinder> {

    return {
      cacheKey: "AppResourceFinder",
      createObservable: () => this.createAppIconPathFinderObservable()
    };
  }

}
