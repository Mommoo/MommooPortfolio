import {ProviderConfig, ProjectCard, serialNumberListNeedToWide} from './project.types';
import {WebClient} from '../../../../../server/webclient/web-client-types';

export class ProjectCardProvider {

  private readonly orderedProjectCardList: ProjectCard[];
  private orderDetector = new OrderDetector();

  public constructor(private config: ProviderConfig) {
    this.orderedProjectCardList = this.createOrderedProjectCardList();
  }

  private createProjectCardWith(basicProject: WebClient.Project.Basic) {
    const enterHTMLTag = '</br>';
    const preciseMaxLimitTextLength
      = this.config.descriptionMaxLimitTextLength
      + (basicProject.descriptions.length * enterHTMLTag.length);

    const description = basicProject.descriptions.join(enterHTMLTag);

    const isTooLongDescription
      = description.length > preciseMaxLimitTextLength;

    const preferredDescription = isTooLongDescription ?
      description.substring(0, preciseMaxLimitTextLength) + "..." : description;

    return {
      serialNumber: basicProject.serialNumber,
      title: basicProject.title,
      previewImage: basicProject.previewBannerImage,
      columnSpan: 1,
      description: preferredDescription,
      skills: [...basicProject.skills]
    };
  }

  private createOrderedProjectCardList() {
    const basicProjectList = [...this.config.basicProjectList];

    const cloneSerialNumberListNeedToWide = [...serialNumberListNeedToWide];

    const orderedProjectCardList: ProjectCard[]
      = new Array(basicProjectList.length);

    let index = -1;

    basicProjectList
      .reverse()
      .map(project => this.createProjectCardWith(project))
      .forEach(projectCard => {
        let cardOrder;
        const indexOfWideList = cloneSerialNumberListNeedToWide.indexOf(projectCard.serialNumber);
        const isWideCard = indexOfWideList !== -1;
        if ( isWideCard ) {
          cardOrder = this.orderDetector.computeNextOrder();
          cloneSerialNumberListNeedToWide.splice(indexOfWideList, 1);
        } else {
          while (true) {
            index++;

            const isWideCardOrder = OrderDetector.isRightOrderPattern(index);
            if ( isWideCardOrder ) {
              continue;
            }

            cardOrder = index;
            break;
          }
        }

        orderedProjectCardList[cardOrder] = projectCard;
      });

    return orderedProjectCardList;
  }

  public getOrderedCardList(isWideMode: boolean) {
    const columnSpan = isWideMode ? this.config.wideCardColumnSpan : this.config.normalCardColumnSpan;

    this.orderedProjectCardList
      .filter((card, index) => OrderDetector.isRightOrderPattern(index))
      .forEach(card => card.columnSpan = columnSpan);

    return this.orderedProjectCardList;
  }
}

export class OrderDetector {
  private currentOrder = 0;

  public static isRightOrderPattern(order: number) {
    return (order - 2) % 5 === 0;
  }

  public computeNextOrder(): number {
    const nextWideCardOrder = 5 * this.currentOrder + 2;
    this.currentOrder++;
    return nextWideCardOrder;
  }
}
