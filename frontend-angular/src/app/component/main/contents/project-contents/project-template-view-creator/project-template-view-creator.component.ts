import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from '@angular/core';
import {TemplateType, TemplateRefProvider} from './project-template-view-creator.types';

@Component({
  selector: 'project-template-view-creator',
  templateUrl: './project-template-view-creator.component.html',
  styleUrls: ['./project-template-view-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectTemplateViewCreatorComponent implements TemplateRefProvider {
  @ViewChild('textViewTemplate')
  private textViewTemplate: TemplateRef<any>;

  @ViewChild('chipViewGroupViewTemplate')
  private chipViewGroupViewTemplate: TemplateRef<any>;

  @ViewChild('youtubeViewTemplate')
  private youtubeViewTemplate: TemplateRef<any>;

  @ViewChild('hyperLinkTextViewTemplate')
  private hyperLinkTextViewTemplate: TemplateRef<any>;

  @ViewChild('projectFeatureGroupTemplate')
  private projectFeatureGroupTemplate: TemplateRef<any>;

  public constructor() { }

  getTemplateRef(templateType: TemplateType): TemplateRef<any> {
    switch (templateType) {
      case TemplateType.TEXT_VIEW:
        return this.textViewTemplate;

      case TemplateType.HYPER_LINK_TEXT_VIEW:
        return this.hyperLinkTextViewTemplate;

      case TemplateType.CHIP_VIEW_GROUP_VIEW:
        return this.chipViewGroupViewTemplate;

      case TemplateType.YOUTUBE_VIDEO:
        return this.youtubeViewTemplate;

      case TemplateType.PROJECT_FEATURE_GROUP_VIEW:
        return this.projectFeatureGroupTemplate;
    }
  }

}
