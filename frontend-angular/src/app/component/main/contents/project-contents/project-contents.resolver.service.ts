import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {WebClient} from '../../../../server/webclient/web-client-types';
import {WebClientHttpClient} from '../../../../server/webclient/web-client-resource.service';
import {Injectable} from '@angular/core';
import {CacheResolver} from '../../../../common/cache-resolver';
import {ResolveProxy} from '../../../../common/common.types';
import Normal = WebClient.Project.Normal;

@Injectable()
export class ProjectContentsDataResolver extends CacheResolver<Normal> {
  constructor(private webclientHttpClient: WebClientHttpClient) {
    super();
  }

  private createNormalProjectObservable(projectTitle: string) {
    return this.webclientHttpClient.getNormalProject(projectTitle);
  }

  protected createResolveProxy(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ResolveProxy<Normal> {
    const projectTitle = route.paramMap.get('projectTitle');
    return {
      cacheKey: projectTitle,
      createObservable: () => this.createNormalProjectObservable(projectTitle)
    };
  }
}
