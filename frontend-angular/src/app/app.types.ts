import {FileResourceType, ImageResourceType, MommooPaper} from './server/resource/resource.types';

export type AppIconPathFinder = Map<ImageResourceType, string>;
export type AppFilePathFinder = Map<FileResourceType, string>;

export interface AppResourceFinder {
  readonly icon: AppIconPathFinder;
  readonly file: AppFilePathFinder;
  readonly papers: MommooPaper[];
}

export enum ResolveKey {
  APP_RESOURCE = 'appResourceData',
  BASIC_CONTENTS = 'basicContentsData',
  PROJECT_CONTENTS = 'projectContentsData'
}
