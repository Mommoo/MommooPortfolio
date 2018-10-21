import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project, Skill} from './data-types';
import {mommooSkillURL, projectSimpleURL} from './url';

@Injectable({
  providedIn: 'root'
})
export class PromiseDataLoader {

  constructor(private httpClient : HttpClient) {}

  public promiseProjectSimples() {
    return this.getPromise<Project.Simple[]>(projectSimpleURL);
  }

  public promiseSkills() {
    return this.getPromise<Skill[]>(mommooSkillURL);
  }

  private getPromise<T>(stringURL) {
    return this.httpClient.get<T>(stringURL).toPromise();
  }
}
