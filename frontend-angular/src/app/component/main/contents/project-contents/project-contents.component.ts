import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {WebClient} from '../../../../server/webclient/web-client-types';
import {ProjectSectionInfo} from './project-contents.types';
import {ProjectSectionDataBuilder} from './project-section-data-builder';
import {BannerInfo} from './image-banner/image-banner.types';
import {ProjectTemplateViewCreatorComponent} from './project-template-view-creator/project-template-view-creator.component';
import {ContentsComponent} from '../contents.component';
import {Subscription} from 'rxjs';
import {ResolveKey} from '../../../../app.types';
import {ContentsSection} from '../contents.types';
import Normal = WebClient.Project.Normal;

@Component({
  selector: 'project-contents',
  templateUrl: './project-contents.component.html',
  styleUrls: ['./project-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContentsComponent extends ContentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('guideSection')
  private guideSectionQueryList: QueryList<ElementRef<HTMLElement>>;

  @ViewChild(ProjectTemplateViewCreatorComponent)
  private templateViewCreator: ProjectTemplateViewCreatorComponent;

  private guideSectionQuerySubscription: Subscription;

  private _bannerInfo: BannerInfo;

  private _sectionInfo: ProjectSectionInfo[];

  public constructor(private injector: Injector) {
    super(injector);
  }

  private static createBannerInfo(normalProject: Normal): BannerInfo {
    return {
      backgroundImageURL: normalProject.UIImage,
      title: normalProject.title,
      subTitle: normalProject.subTitle,
      programType: normalProject.programType
    };
  }

  public ngOnInit() {
    const normalProject: Normal = this.getResolveData(ResolveKey.PROJECT_CONTENTS);
    this._bannerInfo = ProjectContentsComponent.createBannerInfo(normalProject);
    this._sectionInfo = new ProjectSectionDataBuilder(this.templateViewCreator, normalProject).build();
  }

  public ngAfterViewInit(): void {
    let guideSectionElementRefs = this.guideSectionQueryList.toArray();

    this.guideSectionQuerySubscription
      = this.guideSectionQueryList.changes
      .subscribe(_guideSectionElementRefs => guideSectionElementRefs = _guideSectionElementRefs);

    const contentsSections: ContentsSection[] = this._sectionInfo.map((sectionInfo, index) => ({
      menuName: sectionInfo.heading,
      elementRef: guideSectionElementRefs[index]
    }));
    this.setContentsSections(contentsSections);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.guideSectionQuerySubscription.unsubscribe();
  }

  public get bannerInfo(): BannerInfo {
    return this._bannerInfo;
  }

  public get sectionInfos(): ProjectSectionInfo[] {
    return this._sectionInfo;
  }

  protected getGoBackURLIfAbsentHistoryStack(): string | undefined {
    return 'main';
  }
}
