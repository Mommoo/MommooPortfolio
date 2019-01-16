import {WebClient} from '../../../../server/webclient/web-client-types';
import Profile = WebClient.Profile;
import LanguageTech = WebClient.LanguageTech;
import Basic = WebClient.Project.Basic;

export interface BasicContentsData {
  readonly profile: Profile;
  readonly languageTechs: LanguageTech[];
  readonly basicProjects: Basic[];
}

export enum BasicMenuType {
  WELCOME = 'welcome',
  PROFILE = 'profile',
  ABOUT = 'about',
  PROJECT = 'project'
}

export const BasicMenuTypeValues = [
  BasicMenuType.WELCOME,
  BasicMenuType.PROFILE,
  BasicMenuType.ABOUT,
  BasicMenuType.PROJECT
];
