import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ProjectFeatureInfo} from './project-feature.types';

@Component({
  selector: 'project-feature',
  templateUrl: './project-feature.component.html',
  styleUrls: ['./project-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFeatureComponent {

  @Input()
  private projectFeatureInfo: ProjectFeatureInfo;

  public constructor(private sanitizer: DomSanitizer) {
  }

  public isExistFeatureImage() {
    return this.projectFeatureInfo.image;
  }

  public get backgroundImageURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${this.projectFeatureInfo.image}`);
  }

  public get title() {
    return this.projectFeatureInfo.title;
  }

  public get explanations() {
    return this.projectFeatureInfo.explanations;
  }
}
