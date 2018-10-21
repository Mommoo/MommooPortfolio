import {SimpleProjectCard, wideCardProjectNumberList} from './types';
import {Project} from '../../../../../../server/data-types';

/** for 4x4 gird array */
export class SimpleProjectCardProvider {
  private static WIDE_CARD_COLUMN_SPAN = 2;
  private static NORMAL_CARD_COLUMN_SPAN = 1;
  private wideCardIndexList = [];
  private currentIndex = 0;

  private readonly properOrderedCardList: SimpleProjectCard[] = [];

  public constructor(projectSimples: Project.Simple[]) {
    this.initialize();
    this.properOrderedCardList = this.convertToProperOrderedCardList(projectSimples);
  }

  public getBasicSimpleProjectCards() {
    return this.buildColumnSpanToSimpleProjectCards(SimpleProjectCardProvider.NORMAL_CARD_COLUMN_SPAN);
  }

  public getMixedSimpleProjectCards() {
    return this.buildColumnSpanToSimpleProjectCards(SimpleProjectCardProvider.WIDE_CARD_COLUMN_SPAN);
  }

  private buildColumnSpanToSimpleProjectCards(wideCardColumnSpan: number) {
    this.wideCardIndexList
      .forEach(index=> this.properOrderedCardList[index].columnSpan = wideCardColumnSpan);
    return this.properOrderedCardList;
  }

  private initialize() {
    this.currentIndex = 0;
    this.wideCardIndexList = [];
  }

  private convertToProperOrderedCardList(projectSimples: Project.Simple[]): SimpleProjectCard[] {
    const [wideSimpleProjectCards, normalSimpleProjectCards]
      = SimpleProjectCardProvider.divideWideAndNormalGroup(projectSimples);

    const simpleCardCount = projectSimples.length;
    const wideCardCount = wideSimpleProjectCards.length;

    if ( this.isInValidWideCount(simpleCardCount, wideCardCount) ) {
      throw new Error('count of wide-card is invalid');
    }

    const projectCards: SimpleProjectCard[] = [];
    let currentWideCardOrder = this.computeNextWideCardOrder();

    for ( let index = 0; index < projectSimples.length; index++ ) {
      let projectCard: SimpleProjectCard;

      if ( index === currentWideCardOrder ) {
        projectCard = wideSimpleProjectCards.pop();
        this.wideCardIndexList.push(index);
        currentWideCardOrder = this.computeNextWideCardOrder();
      } else {
        projectCard = normalSimpleProjectCards.pop();
      }

      projectCards.push(projectCard);
    }

    return projectCards;
  }

  private static divideWideAndNormalGroup(projectSimples: Project.Simple[]): [SimpleProjectCard[], SimpleProjectCard[]] {
    const wideSimpleProjectCards: SimpleProjectCard[] = [];
    const normalSimpleProjectCards: SimpleProjectCard[] = [];

    projectSimples.forEach(simple=> {
      const portfolioCard = this.convertSimpleToSimpleProjectCard(simple);

      if ( this.isWideCardTargetProject(simple) ) {
        wideSimpleProjectCards.push(portfolioCard);

      } else {
        normalSimpleProjectCards.push(portfolioCard);
      }
    });

    return [wideSimpleProjectCards, normalSimpleProjectCards];
  }

  private static isWideCardTargetProject(simple: Project.Simple) {
    return wideCardProjectNumberList
      .some(projectNumber => projectNumber === simple.projectNumber);
  }

  private static convertSimpleToSimpleProjectCard(simple: Project.Simple): SimpleProjectCard {
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
