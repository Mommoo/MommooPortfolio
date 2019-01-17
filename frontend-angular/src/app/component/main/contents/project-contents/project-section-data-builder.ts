import SpecItem = WebClient.Project.SpecItem;
import Example = WebClient.Project.Example;
import IconExample = WebClient.Project.IconExample;
import {
  ChipViewGroupViewTemplateData,
  ChipViewInfo, HyperLinkTextViewTemplateData, ProjectFeatureGroupViewTemplateData,
  TemplateData,
  TemplateRefProvider, TextViewTemplateData, YoutubeVideoTemplateData
} from './project-template-view-creator/project-template-view-creator.types';
import {ProjectSectionContent, ProjectSectionInfo} from './project-contents.types';
import {ProjectFeatureExplanation, ProjectFeatureInfo} from './project-feature/project-feature.types';
import {WebClient} from '../../../../server/webclient/web-client-types';

type NormalProject = WebClient.Project.Normal;

interface SectionContentContext {
  title?: string;
  templateData: TemplateData;
}

interface TitleSpecItems {
  title: string;
  specItems: SpecItem[];
}

interface TitleChipViewInfos {
  title: string;
  chipViewInfos: ChipViewInfo[];
}

export class ProjectSectionDataBuilder {
  private readonly contentContextRepository: SectionContentContextRepository[];

  public constructor(private templateRefProvider: TemplateRefProvider, normalProject: NormalProject) {
    this.contentContextRepository = [
      new ProjectNameContentContextRepository(normalProject),
      new ProjectOutlineContentContextRepository(normalProject),
      new ProjectEnvironmentContentContextRepository(normalProject),
      new ProjectSkillContentContextRepository(normalProject),
      new ProjectResultContentContextRepository(normalProject),
      new ProjectExampleContentContextRepository(normalProject),
      new ProjectFeatureContentContextRepository(normalProject)
    ];
  }

  private convertContextsToContents(contexts: SectionContentContext[]) {
    return contexts.map<ProjectSectionContent>(context => ({
      title: context.title,
      templateRef: this.templateRefProvider.getTemplateRef(context.templateData.getType()),
      templateContext: context.templateData.getData()
    }));
  }

  public build(): ProjectSectionInfo[] {
    return this.contentContextRepository
      .filter(repository => repository.isNotEmptyContext())
      .map<ProjectSectionInfo>(contextRepository => ({
        heading: contextRepository.getHeading(),
        contents: this.convertContextsToContents(contextRepository.getContexts())
      }));
  }
}

abstract class SectionContentContextRepository {
  private readonly sectionContentContexts: SectionContentContext[] = [];

  public abstract getHeading(): string;

  public getContexts() {
    return this.sectionContentContexts;
  }

  protected appendTemplateData(templateData: TemplateData, title?: string) {
    this.sectionContentContexts.push({
      title: title,
      templateData: templateData
    });
  }

  public isNotEmptyContext() {
    return this.sectionContentContexts.length !== 0;
  }

  public get() {
    return {
      heading: this.getHeading(),
      contexts: this.sectionContentContexts
    };
  }
}

class ProjectNameContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    const projectName = `${normalProject.title} (${normalProject.subTitle})`;
    this.appendTemplateData(new TextViewTemplateData([projectName]));
  }

  public getHeading(): string {
    return "프로젝트 이름";
  }
}

class ProjectOutlineContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    this.appendTemplateData(new TextViewTemplateData(normalProject.descriptions), '프로젝트 설명');
    this.appendTemplateData(new TextViewTemplateData(normalProject.plannings), '프로젝트 기획');
  }

  public getHeading(): string {
    return "프로젝트 개요";
  }
}

class ProjectEnvironmentContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    const spec = normalProject.spec;

    /* create array without undefined value */
    const titleSpecItems: TitleSpecItems[] = [
      {title: '개발 환경', specItems: spec.devEnvironments},
      {title: '실행 환경', specItems: spec.runtimeEnvironments},
      {title: '프로그래밍 언어', specItems: spec.languages},
      {title: '라이브러리', specItems: spec.libraries},
      {title: '프레임워크', specItems: spec.frameworks}
    ].filter(value => value.specItems.length !== 0);

    const titleChipViewInfos: TitleChipViewInfos[]
      = titleSpecItems.map<TitleChipViewInfos>(value => {

      const chipViewInfos = value.specItems.map<ChipViewInfo>(specItem => ({
        iconPath: specItem.image,
        description: specItem.name
      }));

      return {
        title: value.title,
        chipViewInfos: chipViewInfos
      };
    });

    titleChipViewInfos.forEach(titleChipViewInfo => {
      const templateData = new ChipViewGroupViewTemplateData(titleChipViewInfo.chipViewInfos);
      const title = titleChipViewInfo.title;
      this.appendTemplateData(templateData, title);
    });
  }

  public getHeading(): string {
    return "프로젝트 환경";
  }
}

function convertToPlainTextChipViewInfos(strings: string[]) {
  return strings.map<ChipViewInfo>(string => ({
    description: string
  }));
}

class ProjectSkillContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    const chipViewInfos = convertToPlainTextChipViewInfos(normalProject.skills);
    this.appendTemplateData(new ChipViewGroupViewTemplateData(chipViewInfos));
  }

  public getHeading(): string {
    return "프로젝트에 사용된 기술";
  }
}

class ProjectResultContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    const chipViewInfos = convertToPlainTextChipViewInfos(normalProject.results);
    this.appendTemplateData(new ChipViewGroupViewTemplateData(chipViewInfos));
  }

  public getHeading(): string {
    return "프로젝트 결과";
  }
}

class ProjectExampleContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    const exampleDataMap
      = ProjectExampleContentContextRepository.createExampleDataMap(normalProject.example);

    const validEntries = Array.from(exampleDataMap.entries())
      .filter(value => value[1].value);

    const chipViewInfos = validEntries.map<ChipViewInfo>(entry => ({
      iconPath: entry[0].image,
      description: entry[1].description
    }));

    if (chipViewInfos.length > 0) {
      this.appendTemplateData(new ChipViewGroupViewTemplateData(chipViewInfos), '준비된 예시 종류');
    }

    validEntries
      .forEach(entry => {
        const type = entry[1].type;
        const value = entry[1].value;
        let templateData: TemplateData;
        if (type === 'youtube') {
          templateData = new YoutubeVideoTemplateData(value);
        } else if (type === 'url') {
          templateData = new HyperLinkTextViewTemplateData(entry[0].image, entry[1].value);
        }
        this.appendTemplateData(templateData, entry[1].title);
      });
  }

  private static createExampleDataMap(example: Example) {
    const exampleMap = new Map<IconExample, {
      type: string,
      value: string,
      description: string,
      title: string
    }>();
    exampleMap
      .set(example.youtube, {
        type: 'youtube',
        value: example.youtube.token,
        description: 'Youtube Video',
        title: '유튜브 영상'
      })
      .set(example.sample, {
        type: 'url',
        value: example.sample.url,
        description: 'Project Sample',
        title: '프로젝트 샘플 URL'
      })
      .set(example.blog, {
        type: 'url',
        value: example.blog.url,
        description: 'Blog Post',
        title: '블로그 포스트 URL'
      })
      .set(example.github, {
        type: 'url',
        value: example.github.url,
        description: 'GitHub Repository',
        title: '깃허브 저장소 URL'
      });

    return exampleMap;
  }

  public getHeading(): string {
    return "프로젝트 예시";
  }
}

class ProjectFeatureContentContextRepository extends SectionContentContextRepository {
  public constructor(normalProject: NormalProject) {
    super();
    const projectFeatureInfos: ProjectFeatureInfo[]
      = normalProject.features.map<ProjectFeatureInfo>(feature => ({
      title: feature.title,
      image: feature.image,
      explanations: feature.explanations.map<ProjectFeatureExplanation>(explanation => ({
        heading: explanation.heading,
        descriptions: explanation.descriptions
      }))
    }));

    this.appendTemplateData(new ProjectFeatureGroupViewTemplateData(projectFeatureInfos));
  }

  getHeading(): string {
    return "프로젝트 특징";
  }
}

