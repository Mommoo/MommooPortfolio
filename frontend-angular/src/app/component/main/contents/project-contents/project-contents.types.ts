import {TemplateRef} from '@angular/core';

export interface ProjectSectionInfo {
  readonly heading: string;
  readonly contents: ProjectSectionContent[];
}

export interface ProjectSectionContent {
  readonly title: string;
  readonly templateRef: TemplateRef<any>;
  readonly templateContext: any;
}


