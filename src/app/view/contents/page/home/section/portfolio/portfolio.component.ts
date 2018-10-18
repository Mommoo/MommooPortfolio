import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {MommooCard} from '../../../../../../../mommoo-library/ui/card/card.component';
import {Router} from '@angular/router';
import {DataLoaderService} from '../../../../../../data/http/data-loader.service';
import {Project} from '../../../../../../data/http/http-data-structure';
import {MommooCardsLoadCheckerService} from '../../../../../../../mommoo-library/ui/card/card-load-checker.service';
import {WindowEventHandler} from '../../../../../../../mommoo-library/handler/window/window-event';
import {ViewportSize} from '../../../../../../../mommoo-library/handler/window/type';
import {BasicSectionComponent} from '../../common/basic/basic-section.component';
import {PortfolioCard} from './types';
import {PortfolioCardProvider} from './portfolio-card-provider';

@Component({
  selector: 'view-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent extends BasicSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private masonryColChangeEventID;
  private portfolioCardProvider = new PortfolioCardProvider();

  public portfolioCards: PortfolioCard[] = [];
  public masonryLayoutColumnLength: number = 4;
  public doLayout: boolean = false;

  @ViewChildren(MommooCard)
  private mommooCardQueryList: QueryList<MommooCard>;

  public constructor(private changeDetector: ChangeDetectorRef,
                     private dataLoader: DataLoaderService,
                     private mommooCardsLoadChecker: MommooCardsLoadCheckerService,
                     private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.dataLoader
      .getProjectSimple()
      .subscribe(projectCards => this.setPortfolioCards(projectCards));
  }

  public ngAfterViewInit(): void {
    this.masonryColChangeEventID =
      WindowEventHandler
        .addViewportChangeEvent(viewportSize => this.changeMasonryColumnLength(viewportSize), true);
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
    this.buildProperPortfolioCards();
  }

  private buildProperPortfolioCards() {
    if ( this.masonryLayoutColumnLength === 4 ){
      this.portfolioCards = this.portfolioCardProvider.getMixedPortfolioCards();
    } else {
      this.portfolioCards = this.portfolioCardProvider.getBasicPortfolioCards();
    }
    this.changeDetector.detectChanges();
  }

  private setPortfolioCards(projectSimples: Project.Simple[]) {
    this.portfolioCardProvider.setProjectSimples(projectSimples);

    this.buildProperPortfolioCards();

    /** mommooCardQueryList is always loaded complete thanks to pre-executing of detectChanges() in onNext method */
    this.mommooCardsLoadChecker.checkCardsLoaded(this.mommooCardQueryList.toArray(), () => {
      this.doLayout = true;
      this.changeDetector.detectChanges();
    });
  }

  protected getPageTitle(): string {
    return 'PORTFOLIO';
  }

  protected getPageSubTitle(): string[] {
    return ['저는 수 많은 개인 프로젝트를 진행 했습니다.',
      '프로젝트 전부 혼자서 만들었다는 것이 특징입니다.',
      '구현에만 몰두 하는 것이 아닌,',
      '프로젝트를 하면서 필요한 내용을 \'공부\' 하여 \'원리\'를 습득하는것에 집중 하였습니다.'];
  }
}
