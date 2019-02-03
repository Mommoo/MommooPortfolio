import {ProjectCard, ProviderConfig} from './project.types';
import {WebClient} from '../../../../../server/webclient/web-client-types';

export class ProjectCardProvider {

  private readonly orderedProjectCardList: ProjectCard[];

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
      description: preferredDescription,
      skills: [...basicProject.skills]
    };
  }

  private createOrderedProjectCardList() {
    const basicProjectList = [...this.config.basicProjectList];

    return basicProjectList
      .sort((p1, p2) => p2.serialNumber - p1.serialNumber)
      .map(project => this.createProjectCardWith(project));
  }

  public getProjectCards() {
    return this.orderedProjectCardList;
  }
}
