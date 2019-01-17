export interface ProjectFeatureInfo {
  readonly image: string;
  readonly title: string;
  readonly explanations: ProjectFeatureExplanation[];
}

export interface ProjectFeatureExplanation {
  readonly heading: string;
  readonly descriptions: string[];
}
