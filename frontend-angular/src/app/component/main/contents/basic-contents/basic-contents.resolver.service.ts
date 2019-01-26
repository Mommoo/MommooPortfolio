import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {WebClientHttpClient} from '../../../../server/webclient/web-client-resource.service';
import {BasicContentsData} from './basic-contents.types';
import {CacheResolver} from '../../../../common/cache-resolver';
import {ResolveProxy} from '../../../../common/common.types';

/**
 * This class have a role that load 'introduction' and 'basic-project' data of webclient.
 * {@link Introduction}, {@link Project.Basic}
 * */
@Injectable()
export class BasicContentsDataResolver extends CacheResolver<BasicContentsData> {
  public constructor(private webClientHttpClient: WebClientHttpClient) {
    super();
  }

  private createBasicContentsDataObservable() {
    const introduction$ = this.webClientHttpClient.getIntroduction();
    const basicProject$ = this.webClientHttpClient.getAllBasicProjects();

    const basicContents$ = forkJoin(
      introduction$,
      basicProject$
    );

    return basicContents$.pipe(
      map(value => ({
        profile: value[0].profile,
        languageTechs: value[0].languageTechs,
        basicProjects: value[1]
      }))
    );
  }

  protected createResolveProxy(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : ResolveProxy<BasicContentsData> {

    return {
      cacheKey: "BasicContentsData",
      createObservable: () => this.createBasicContentsDataObservable()
    };
  }
}
