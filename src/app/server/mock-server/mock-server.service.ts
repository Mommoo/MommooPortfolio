import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';
import {mommooSkillEndPoint, projectDetailEndPoint, projectSimpleEndPoint} from '../url';
import {MockProject} from './mock-project-data';
import {MockMommooSkills} from './mock-mommoo-skills';

@Injectable()
export class MockServerService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(()=>{
      if ( req.url.endsWith(projectDetailEndPoint) ) {
        return of(new HttpResponse({ status: 200, body: MockProject.detail }))
      }

      if ( req.url.endsWith(projectSimpleEndPoint) ) {
        return of(new HttpResponse( {status: 200, body: MockProject.simple} ))
      }

      if ( req.url.endsWith(mommooSkillEndPoint)) {
        return of(new HttpResponse({status:200, body: MockMommooSkills}))
      }
    })).pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockServerService,
  multi: true
};
