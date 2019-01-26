import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebClient} from './web-client-types';
import {RestAPIUrl} from '../rest-api-url';
import {share} from 'rxjs/operators';

/**
 * This {@link WebClientHttpClient} have a responsibility
 * that communication with server REST API designed as `WebClient`
 *
 * To implementation of communication with server,
 * this class use the HttpClient API. {@link HttpClient}
 *
 * The result of communicated with server be made with the observer object
 *
 * @author mommoo
 */

@Injectable()
export class WebClientHttpClient {
  public constructor(private httpClient: HttpClient) {}

  public getIntroduction() {
    return this.httpClient
      .get<WebClient.Introduction>(RestAPIUrl.WebClient.introductionURL())
      .pipe(share());
  }

  public getAllBasicProjects() {
    return this.httpClient
      .get<WebClient.Project.Basic[]>(RestAPIUrl.WebClient.allBasicProjectsURL())
      .pipe(share());
  }

  public getNormalProject(title: string) {
    return this.httpClient
      .get<WebClient.Project.Normal>(RestAPIUrl.WebClient.normalProjectByTitleURL(title))
      .pipe(share());
  }
}
