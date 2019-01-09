import {Injectable} from '@angular/core';
import {WebClientHttpClient} from './server/webclient/web-client-resource.service';
import {Observable} from 'rxjs';

export enum AppImageNameType {
  PDF = 'pdf',
  GITHUB = 'github',
  TISTORY = 'tistory',
  ARROW_BACK = 'arrow-back',
  MAIL = 'mail'
}

@Injectable()
export class AppImagePathFinder {
  public readonly observable: Observable<Map<AppImageNameType, string>>;

  public constructor(private webClientHttpClient: WebClientHttpClient) {
    const appImageNames = Object.keys(AppImageNameType).map(key => AppImageNameType[key]);
    this.observable = webClientHttpClient.getImagePath<AppImageNameType>(...appImageNames);
  }
}
