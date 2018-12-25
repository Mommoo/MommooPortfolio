import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MommooCard} from '../../../../../mommoo-library/ui/card/card.component';
import {MommooMasonryLayout} from '../../../../../mommoo-library/ui/masonry-layout/masonry-layout.component';
import {WebClientDataLoader} from '../../../../server/webclient/web-client-resource.service';
import {MommooCardsLoadCheckerService} from '../../../../../mommoo-library/ui/card/card-load-checker.service';
import {Router} from '@angular/router';
import {ContentsLayoutDetector} from '../../contents-layout-finder.service';
import {AngularUtils} from '../../../../../mommoo-library/util/angular';
import {ProjectCardProvider} from './project-card-provider';
import {ProjectCard, ProviderConfig} from './project.types';
import {WebClient} from '../../../../server/webclient/web-client-types';
import {ContentsItem} from '../../main.types';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
  private static readonly preferredMaxCardWidth = 320;
  private static readonly minCardWidth = 300;

  private static readonly maxLimitTextLength = 100;
  private static readonly wideCardColumnSpan = 2;
  private static readonly normalCardColumnSpan = 1;

  @ViewChildren(MommooCard)
  private mommooCardQueryList: QueryList<MommooCard>;

  @ViewChild(MommooMasonryLayout)
  private mommooMasonryLayout: MommooMasonryLayout;

  private masonryColumnChangeEventID: string;
  private _masonryColumnLength = 4;

  private _projectCardList: ProjectCard[];

  public constructor(private changeDetector: ChangeDetectorRef,
                     private webClientDataLoader: WebClientDataLoader,
                     private mommooCardsLoadChecker: MommooCardsLoadCheckerService,
                     private router: Router,
                     private contentsLayoutDetector: ContentsLayoutDetector) {

    this.changeDetector = AngularUtils.createAsyncChangeDetectorRef(changeDetector);
  }

  private static createProviderConfig(basicProjectList: WebClient.Project.Basic[]): ProviderConfig {
    return {
      wideCardColumnSpan: this.wideCardColumnSpan,
      normalCardColumnSpan: this.normalCardColumnSpan,
      descriptionMaxLimitTextLength: this.maxLimitTextLength,
      basicProjectList: basicProjectList
    };
  }

  private async createProjectCardProvider() {
    const basicProjects = await this.webClientDataLoader.projectLoader.getAllBasicProjects();
    const providerConfig = ProjectComponent.createProviderConfig(basicProjects);
    return new ProjectCardProvider(providerConfig);
  }

  private enrollMasonryColumnChangeEvent(projectCardProvider: ProjectCardProvider) {
    const preferredItem: ContentsItem = {
      preferredWidth: ProjectComponent.preferredMaxCardWidth,
      minWidth: ProjectComponent.minCardWidth
    };

    let first = true;

    return this.contentsLayoutDetector.subscribe(preferredItem, properContentsLayout => {

      this._masonryColumnLength = properContentsLayout.numberOfItem;
      const isWideMode = this._masonryColumnLength > 1 && properContentsLayout.calculatedItemWidth < 400;
      this._projectCardList = projectCardProvider.getOrderedCardList(isWideMode);
      this.changeDetector.detectChanges();
      if ( first ) {
        first = false;
        this.renderMasonryLayout();
      }
    });
  }

  private renderMasonryLayout() {
    this.mommooMasonryLayout.paintMasonryTiles();
    this.changeDetector.detectChanges();
    this.mommooMasonryLayout.layoutMasonryTiles();
  }

  public async ngOnInit() {
    const projectCardProvider = await this.createProjectCardProvider();

    /** Need to first drawing to calculate */
    this._projectCardList = projectCardProvider.getOrderedCardList(false);
    this.changeDetector.detectChanges();

    /** Waiting for all of card loaded */
    await this.mommooCardsLoadChecker.promiseLoadCards(this.mommooCardQueryList.toArray());

    this.renderMasonryLayout();

    this.masonryColumnChangeEventID = this.enrollMasonryColumnChangeEvent(projectCardProvider);
  }

  public ngOnDestroy(): void {
    this.contentsLayoutDetector.unSubscribe(this.masonryColumnChangeEventID);
  }

  public get masonryColumnLength() {
    return this._masonryColumnLength;
  }

  public get projectCardList() {
    return this._projectCardList;
  }

  public onCardClickListener(serialNumber: number) {
    // alert(`serialNumber is ${serialNumber}`);
    // this.router.navigate(['main', 'dfdf']);
  }

  public get bannerTitle(): string {
    return 'PROJECT';
  }

  public get bannerDescriptions(): string[] {
    return ['저는 수 많은 개인 프로젝트를 진행 했습니다.',
      '프로젝트 전부 혼자서 만들었다는 것이 특징입니다.',
      '기능 구현에만 몰두 하는 것이 아닌,',
      '프로젝트를 하면서 필요한 내용을 \'공부\' 하여 \'원리\'를 습득 하는것에 집중 하였습니다.',
      '카드를 눌러보시면 더 상세한 정보를 볼 수 있습니다.'];
  }

}
