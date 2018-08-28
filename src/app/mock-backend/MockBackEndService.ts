import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {of, Observable} from 'rxjs';
import {ProjectDatas} from './ProjectData';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable()
export class MockBackEndService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of(null).pipe(mergeMap(()=>{
      if ( req.url.endsWith('/project/detail') ) {
        console.log('project rest api call');
        return of(new HttpResponse({ status: 200, body: ProjectDatas }))

      }
    })).pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize())
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackEndService,
  multi: true
};
