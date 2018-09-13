import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../data/http-data-structure';
import {flatMap, map, toArray} from 'rxjs/operators';
import {from} from 'rxjs/internal/observable/from';
import {ProjectCardData} from './portfolio.component';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CardAsyncLoaderService {
  private static readonly PORTFOLIO_DETAIL_URL = 'http://mommoo.co.kr/porfolio/project/detail';
  private loadConfirmArray : Array<boolean>;
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
        next(dataArray){
          self.loadConfirmArray = new Array(dataArray.length).fill(false, 0, dataArray.length);
        },
        complete() {
          self.isDataDownLoaded = true;
        }
      }
    );

    return projectCardDataArray$
      .pipe(
        flatMap(dataArray => from(dataArray)),
        map((projectDetail, index) => {
          return {
            title: projectDetail.title,
            imagePath: projectDetail.imagePath,
            devSkills: projectDetail.devSkills,
            summary: projectDetail.summary,
            description: projectDetail.description,
            onClickListener: () => {},
            onLoadCompleteListener: () => self.notifyLoadComplete(index),
            cardColSpan: projectDetail.devLevel
          };
        }),
        toArray()
      );
  }

  private notifyLoadComplete(index : number) {
    this.loadConfirmArray[index] = true;
    if (this.isWatchStarted && this.checkTileLoadAllDone()) {
      this.loadCompleteLister();
    }
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
    return this.loadConfirmArray.every(bool => bool);
  }
}
