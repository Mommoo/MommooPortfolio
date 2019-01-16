import {WebClient} from '../../../../../server/webclient/web-client-types';

export interface ProjectCard {
  readonly serialNumber: number;
  readonly title: string;
  readonly previewImage: string;
  readonly description: string;
  readonly skills: string[];
  columnSpan: number;
}

export interface ProviderConfig {
  readonly wideCardColumnSpan: number;
  readonly normalCardColumnSpan: number;
  readonly descriptionMaxLimitTextLength: number;
  readonly basicProjectList: WebClient.Project.Basic[];
}

const samsungScriptMonitoring = 11;
const kwakiDayProjectNumber = 1;
export const serialNumberListNeedToWide = [kwakiDayProjectNumber, samsungScriptMonitoring];
