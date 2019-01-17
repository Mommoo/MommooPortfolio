import {ProjectFeatureInfo} from '../project-feature/project-feature.types';
import {TemplateRef} from '@angular/core';

export enum TemplateType {
  TEXT_VIEW,
  HYPER_LINK_TEXT_VIEW,
  CHIP_VIEW_GROUP_VIEW,
  YOUTUBE_VIDEO,
  PROJECT_FEATURE_GROUP_VIEW
}

export interface TemplateRefProvider {
  getTemplateRef(templateType: TemplateType): TemplateRef<any>;
}

export abstract class TemplateData {
  public abstract getType(): TemplateType;
  public abstract getData(): any;
}

export class TextViewTemplateData extends TemplateData {
  public constructor(private texts: string[]) {
    super();
  }

  getData(): any {
    return {
      texts: this.texts
    };
  }

  getType(): TemplateType {
    return TemplateType.TEXT_VIEW;
  }
}

export class HyperLinkTextViewTemplateData extends TemplateData {
  private readonly description;

  public constructor(private icon: string, private href: string, description?: string) {
    super();
    if (description) {
      this.description = description;
    } else {
      this.description = href;
    }
  }

  getData(): any {
    return {
      icon: this.icon,
      href: this.href,
      description: this.description
    };
  }

  getType(): TemplateType {
    return TemplateType.HYPER_LINK_TEXT_VIEW;
  }
}

export interface ChipViewInfo {
  readonly iconPath?: string;
  readonly description: string;
}

export class ChipViewGroupViewTemplateData extends TemplateData {
  public constructor(private chipViewInfos: ChipViewInfo[]) {
    super();
  }

  public getData(): any {
    return {
      chipViewInfos: this.chipViewInfos
    };
  }

  public getType(): TemplateType {
    return TemplateType.CHIP_VIEW_GROUP_VIEW;
  }
}

export class YoutubeVideoTemplateData extends TemplateData {
  public constructor(private youtubeToken: string) {
    super();
  }

  getData(): any {
    return {
      youtubeToken: this.youtubeToken
    };
  }

  getType(): TemplateType {
    return TemplateType.YOUTUBE_VIDEO;
  }
}

export class ProjectFeatureGroupViewTemplateData extends TemplateData {
  public constructor(private projectFeatureInfos: ProjectFeatureInfo[]) {
    super();
  }

  getData(): any {
    return {
      projectFeatureInfos: this.projectFeatureInfos
    };
  }

  getType(): TemplateType {
    return TemplateType.PROJECT_FEATURE_GROUP_VIEW;
  }
}
