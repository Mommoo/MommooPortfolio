import {ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {BasicContentsData, BasicMenuType} from './basic-contents.types';
import {ContentsComponent} from '../contents.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';
import {ProjectComponent} from './project/project.component';
import {AppResourceFinder, ResolveKey} from '../../../../app.types';
import {ContentsSection} from '../contents.types';

@Component({
  selector: 'basic-contents',
  templateUrl: './basic-contents.component.html',
  styleUrls: ['./basic-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicContentsComponent extends ContentsComponent implements OnInit {
  @ViewChild(WelcomeComponent, {read: ElementRef})
  private welcomeElementRef: ElementRef<HTMLElement>;

  @ViewChild(ProfileComponent, {read: ElementRef})
  private profileElementRef: ElementRef<HTMLElement>;

  @ViewChild(AboutComponent, {read: ElementRef})
  private aboutElementRef: ElementRef<HTMLElement>;

  @ViewChild(ProjectComponent, {read: ElementRef})
  private projectElementRef: ElementRef<HTMLElement>;

  public constructor(private injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    const contentsSections: ContentsSection[] = [
      {menuName: BasicMenuType.WELCOME, elementRef: this.welcomeElementRef},
      {menuName: BasicMenuType.PROFILE, elementRef: this.profileElementRef},
      {menuName: BasicMenuType.ABOUT, elementRef: this.aboutElementRef},
      {menuName: BasicMenuType.PROJECT, elementRef: this.projectElementRef}
    ];
    this.setContentsSections(contentsSections);
  }

  protected getGoBackURLIfAbsentHistoryStack(): string | undefined {
    return undefined;
  }

  public get basicContentsData(): BasicContentsData {
    return this.getResolveData(ResolveKey.BASIC_CONTENTS);
  }

  public get appResourceFinder(): AppResourceFinder {
    return this.getResolveData(ResolveKey.APP_RESOURCE);
  }
}
