import {Project} from '../../../../../../data/http/http-data-structure';
import {PortfolioCard, wideCardProjectNumberList} from './types';

/** for 4x4 gird array */
export class PortfolioCardProvider {
  private static WIDE_CARD_COLUMN_SPAN = 2;
  private static NORMAL_CARD_COLUMN_SPAN = 1;
  private wideCardIndexList = [];
  private currentIndex = 0;

  private properOrderedCardList: PortfolioCard[] = [];

  public setProjectSimples(projectSimples: Project.Simple[]) {
    this.initialize();
    this.properOrderedCardList = this.convertToProperOrderedCardList(projectSimples);
  }

  public getBasicPortfolioCards() {
    return this.buildColumnSpanToPortfolioCards(PortfolioCardProvider.NORMAL_CARD_COLUMN_SPAN);
  }

  public getMixedPortfolioCards() {
    return this.buildColumnSpanToPortfolioCards(PortfolioCardProvider.WIDE_CARD_COLUMN_SPAN);
  }

  private buildColumnSpanToPortfolioCards(wideCardColumnSpan: number) {
    this.wideCardIndexList
      .forEach(index=> this.properOrderedCardList[index].columnSpan = wideCardColumnSpan);
    return this.properOrderedCardList;
  }

  private initialize() {
    this.currentIndex = 0;
    this.wideCardIndexList = [];
  }

  private convertToProperOrderedCardList(projectSimples: Project.Simple[]): PortfolioCard[] {
    const [widePortfolioCards, normalPortfolioCards]
      = PortfolioCardProvider.divideWideAndNormalGroup(projectSimples);

    const simpleCardCount = projectSimples.length;
    const wideCardCount = widePortfolioCards.length;

    if ( this.isInValidWideCount(simpleCardCount, wideCardCount) ) {
      throw new Error('count of wide-card is invalid');
    }

    const portfolioCards: PortfolioCard[] = [];
    let currentWideCardOrder = this.computeNextWideCardOrder();

    for ( let index = 0; index < projectSimples.length; index++ ) {
      let portfolioCard: PortfolioCard;

      if ( index === currentWideCardOrder ) {
        portfolioCard = widePortfolioCards.pop();
        this.wideCardIndexList.push(index);
        currentWideCardOrder = this.computeNextWideCardOrder();
      } else {
        portfolioCard = normalPortfolioCards.pop();
      }

      portfolioCards.push(portfolioCard);
    }

    return portfolioCards;
  }

  private static divideWideAndNormalGroup(projectSimples: Project.Simple[]): [PortfolioCard[], PortfolioCard[]] {
    const widePortfolioCards: PortfolioCard[] = [];
    const normalPortfolioCards: PortfolioCard[] = [];

    projectSimples.forEach(simple=> {
      const portfolioCard = this.convertSimpleToPortfolioCard(simple);

      if ( this.isWideCardTargetProject(simple) ) {
        widePortfolioCards.push(portfolioCard);

      } else {
        normalPortfolioCards.push(portfolioCard);
      }
    });

    return [widePortfolioCards, normalPortfolioCards];
  }

  private static isWideCardTargetProject(simple: Project.Simple) {
    return wideCardProjectNumberList
      .some(projectNumber => projectNumber === simple.projectNumber);
  }

  private static convertSimpleToPortfolioCard(simple: Project.Simple): PortfolioCard {
    return {
      ...simple,
      columnSpan: this.NORMAL_CARD_COLUMN_SPAN
    }
  }

  //Recurrence relation that how to place at 4x4 grid section
  private computeNextWideCardOrder(): number{
    const nextWideCardOrder = 5 * this.currentIndex + 2;
    this.currentIndex++;
    return nextWideCardOrder;
  }

  private isInValidWideCount(simpleCardCount: number, wideCardCount: number): boolean{
    while(this.computeNextWideCardOrder() < simpleCardCount) {

    }

    const isValidWideCount = this.currentIndex - 1 === wideCardCount;
    this.currentIndex = 0;

    return !isValidWideCount;
  }
}
