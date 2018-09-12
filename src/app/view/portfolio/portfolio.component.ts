import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CommonDataService} from '../../common/common-data.service';
import {ViewportDimension, WindowEventService} from '../../common/window-event.service';
import {MommooCard} from '../../ui/card/card.component';
import {CardAsyncLoaderService} from './card-async-loader.service';

@Component({
  selector: 'view-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  public themeColor: string;
  public projectCardDataArray: Array<ProjectCardData> = [];
  public masonryLayoutColumnCount: number = 4;
  public doLayout: boolean = false;

  @ViewChildren(MommooCard)
  private mommooCardQueryList: QueryList<MommooCard>;

  constructor(commonDataService: CommonDataService,
              private changeDetector: ChangeDetectorRef,
              private windowEventService: WindowEventService,
              private cardAsyncLoader: CardAsyncLoaderService) {

    this.themeColor = commonDataService.getThemeColor();
  }

  ngOnInit(): void {
    const selfInstance = this;

    this.cardAsyncLoader
      .loadBegin()
      .subscribe({
        next(projectCardDataArray) {
          selfInstance.projectCardDataArray = projectCardDataArray;
          selfInstance.changeDetector.detectChanges();
        }
      });

    this.cardAsyncLoader.startWatch(() => {
      selfInstance.doLayout = true;
      selfInstance.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {
      switch (viewportDimension) {
        case ViewportDimension.DESKTOP :
        case ViewportDimension.TABLET :
          this.masonryLayoutColumnCount = 4;
          break;
        case ViewportDimension.MOBILE :
          this.masonryLayoutColumnCount = 2;
          break;
      }

      this.changeDetector.detectChanges();
    }, true);
  }
}

export interface ProjectCardData {
  title: string,
  imagePath: string,
  devSkills: Array<string>,
  summary: string,
  description: string,
  onClickListener: () => void,
  onLoadCompleteListener: () => void,
  cardColSpan: number;
}
