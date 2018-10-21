import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MommooCard} from '../../../../../../../mommoo-library/ui/card/card.component';
import {Router} from '@angular/router';
import {WindowEventHandler} from '../../../../../../../mommoo-library/handler/window/window-event';
import {ViewportSize} from '../../../../../../../mommoo-library/handler/window/type';
import {BasicSection} from '../../common/basic/basic-section.component';
import {SimpleProjectCard} from './types';
import {MommooMasonryLayout} from '../../../../../../../mommoo-library/ui/masonry-layout/masonry-layout.component';
import {MommooCardsLoadCheckerService} from '../../../../../../../mommoo-library/ui/card/card-load-checker.service';
import {PromiseDataLoader} from '../../../../../../server/promise-data-loader.service';
import {SimpleProjectCardProvider} from './simple-project-card-provider';

@Component({
  selector: 'simple-project-section',
  templateUrl: './simple-project.component.html',
  styleUrls: ['./simple-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleProjectSection extends BasicSection implements OnInit, OnDestroy {
  private masonryColChangeEventID;
  private projectCardProvider: SimpleProjectCardProvider;

  public simpleProjectCards: SimpleProjectCard[] = [];
  public masonryLayoutColumnLength: number = 4;

  @ViewChildren(MommooCard)
  private mommooCardQueryList: QueryList<MommooCard>;

  @ViewChild(MommooMasonryLayout)
  private mommooMasonryLayout: MommooMasonryLayout;

  public constructor(private changeDetector: ChangeDetectorRef,
                     private dataLoader: PromiseDataLoader,
                     private mommooCardsLoadChecker: MommooCardsLoadCheckerService,
                     private router: Router) {
    super();
  }

  public async ngOnInit() {
    this.projectCardProvider = await this.promiseProjectCardProvider();
    this.simpleProjectCards = this.computeProperProjectCards(this.masonryLayoutColumnLength);
    /** NeedTo First Drawing to Calculate */
    this.changeDetector.detectChanges();

    await this.awaitMommooCardLoad();
    this.mommooMasonryLayout.paintMasonryTiles();
    this.changeDetector.detectChanges();
    this.mommooMasonryLayout.layoutMasonryTiles();

    this.masonryColChangeEventID =
      WindowEventHandler
        .addViewportChangeEvent(viewportSize => this.changeMasonryColumnLength(viewportSize), true);
  }

  private async promiseProjectCardProvider() {
    const projectSimples = await this.dataLoader.promiseProjectSimples();
    return new SimpleProjectCardProvider(projectSimples);
  }

  private async awaitMommooCardLoad() {
    await this.mommooCardsLoadChecker.promiseLoadCards(this.mommooCardQueryList.toArray());
  }

  public ngOnDestroy(): void {
    WindowEventHandler.removeEvent(this.masonryColChangeEventID);
  }

  public onCardClickListener(title: string) {
    this.router.navigate(['main', title]);
  }

  private changeMasonryColumnLength(viewportSize: ViewportSize) {
    if (viewportSize === ViewportSize.MOBILE) {
      this.masonryLayoutColumnLength = 2;
    } else {
      this.masonryLayoutColumnLength = 4;
    }
    this.simpleProjectCards = this.computeProperProjectCards(this.masonryLayoutColumnLength);
    this.changeDetector.detectChanges();
  }

  private computeProperProjectCards(columnLength): SimpleProjectCard[] {
    if ( columnLength === 4 ){
      return this.projectCardProvider.getMixedSimpleProjectCards();
    } else {
      return this.projectCardProvider.getBasicSimpleProjectCards();
    }
  }

  protected getPageTitle(): string {
    return 'PROJECT';
  }

  protected getPageSubTitle(): string[] {
    return ['저는 수 많은 개인 프로젝트를 진행 했습니다.',
      '프로젝트 전부 혼자서 만들었다는 것이 특징입니다.',
      '구현에만 몰두 하는 것이 아닌,',
      '프로젝트를 하면서 필요한 내용을 \'공부\' 하여 \'원리\'를 습득하는것에 집중 하였습니다.'];
  }
}
