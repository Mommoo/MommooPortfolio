import {WebClient} from '../../../../../server/webclient/web-client-types';

export interface ProjectCard {
  readonly serialNumber: number;
  readonly title: string;
  readonly previewImage: string;
  readonly description: string;
  readonly skills: string[];
}

export interface ProviderConfig {
  readonly descriptionMaxLimitTextLength: number;
  readonly basicProjectList: WebClient.Project.Basic[];
}
