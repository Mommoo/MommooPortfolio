import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project, Skill} from './http-data-structure';
import {PROJECT_DETAIL_DATA_URL, PROJECT_SIMPLE_DATA_URL, SKILL_DATA_URL} from './http-data-url';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private httpClient : HttpClient) {}

  public getProjectDetails() : Observable<Project.Detail[]> {
    return this.httpClient.get<Project.Detail[]>(PROJECT_DETAIL_DATA_URL)
  }

  public getProjectSimple(): Observable<Project.Simple[]> {
    return this.httpClient.get<Project.Simple[]>(PROJECT_SIMPLE_DATA_URL)
  }

  public getSkills() : Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(SKILL_DATA_URL)
  }
}
