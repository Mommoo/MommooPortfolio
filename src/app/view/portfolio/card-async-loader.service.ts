import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../data/http-data-structure';
import {flatMap, map, toArray} from 'rxjs/operators';
import {from} from 'rxjs/internal/observable/from';
import {ProjectCardData} from './portfolio.component';
import {Observable} from 'rxjs/internal/Observable';

export interface SubscribeHandler {
  notifyLoadComplete: () => void,
  notifyLoadCancel: () => void,
  unSubscribe: () => void
}

interface SubscriberInfo {
  subscribeID: any,
  isLoaded: boolean
}

@Injectable({
  providedIn: 'root'
})
export class CardAsyncLoaderService {
  private static readonly PORTFOLIO_DETAIL_URL = 'http://mommoo.co.kr/porfolio/project/detail';
  private loadFinder: Map<any, boolean> = new Map<any, boolean>();
  private loadCompleteLister: () => void = () => {
  };
  private isWatchStarted: boolean = false;
  private isDataDownLoaded: boolean = false;

  constructor(private httpClient: HttpClient) {

  }

  public loadBegin(): Observable<Array<ProjectCardData>> {
    const self = this;
    const projectCardDataArray$ = this.httpClient
      .get<Array<Project.Detail>>(CardAsyncLoaderService.PORTFOLIO_DETAIL_URL);

    projectCardDataArray$.subscribe({
        complete() {
          self.isDataDownLoaded = true;
        }
      }
    );

    return projectCardDataArray$
      .pipe(
        flatMap(dataArray => from(dataArray)),
        map(projectDetail => {
          const subscribeHandler = self.subscribe(projectDetail);
          return {
            title: projectDetail.title,
            imagePath: projectDetail.imagePath,
            devSkills: projectDetail.devSkills,
            summary: projectDetail.summary,
            description: projectDetail.description,
            onClickListener: () => {},
            onLoadCompleteListener: () => subscribeHandler.notifyLoadComplete(),
            cardColSpan: projectDetail.devLevel
          };
        }),
        toArray()
      );
  }

  private subscribe(subscribeID: any): SubscribeHandler {
    this.loadFinder.set(subscribeID, false);
    const serviceInstance = this;

    return {
      notifyLoadComplete() {
        serviceInstance.loadFinder.set(subscribeID, true);
        if (serviceInstance.isWatchStarted && serviceInstance.checkTileLoadAllDone()) {
          serviceInstance.loadCompleteLister();
        }
      },
      notifyLoadCancel() {
        serviceInstance.loadFinder.set(subscribeID, false);
      },
      unSubscribe() {
        serviceInstance.loadFinder.delete(subscribeID);
      }
    };
  }

  public startWatch(loadCompleteLister: () => void) {
    this.isWatchStarted = true;

    if (this.checkTileLoadAllDone()) {
      loadCompleteLister();
    }

    this.loadCompleteLister = loadCompleteLister;
  }

  private checkTileLoadAllDone(): boolean {
    if (!this.isDataDownLoaded) {
      return false;
    }
    return this.convertMapFinderToArrayFinder()
      .every(value => value.isLoaded);
  }

  private convertMapFinderToArrayFinder(): SubscriberInfo[] {
    const array: SubscriberInfo[] = [];
    const iterator = this.loadFinder.entries();
    while (true) {
      const {value, done} = iterator.next();
      if (done) {
        break;
      }
      array.push({
        subscribeID: value[0],
        isLoaded: value[1]
      });
    }

    return array;
  }
}
