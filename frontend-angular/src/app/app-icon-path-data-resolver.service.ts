import {Injectable} from '@angular/core';
import {WebClientHttpClient} from './server/webclient/web-client-resource.service';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {CacheResolver} from './common/cache-resolver';
import {AppIconPathFinder, AppIconType} from './app.types';
import {ResolveProxy} from './common/common.types';

@Injectable()
export class AppIconPathDataResolver extends CacheResolver<AppIconPathFinder> {
  public constructor(private webClientHttpClient: WebClientHttpClient) {
    super();
  }

  private createAppIconPathFinderObservable(): Observable<AppIconPathFinder> {
    const imageNames = Object.keys(AppIconType).map(key => AppIconType[key]);
    return this.webClientHttpClient.getImagePath(...imageNames);
  }

  protected createResolveProxy(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : ResolveProxy<AppIconPathFinder> {

    return {
      cacheKey: "AppIconData",
      createObservable: () => this.createAppIconPathFinderObservable()
    };
  }

}
