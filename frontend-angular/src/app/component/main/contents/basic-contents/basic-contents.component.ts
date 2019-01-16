import {ChangeDetectionStrategy, Component, ElementRef, Injector, OnInit, ViewChild} from '@angular/core';
import {BasicContentsData, BasicMenuType, BasicMenuTypeValues} from './basic-contents.types';
import {CommonContentsComponent} from '../common-contents.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';
import {ProjectComponent} from './project/project.component';
import {AppIconPathFinder, ResolveKey} from '../../../../app.types';

@Component({
  selector: 'basic-contents',
  templateUrl: './basic-contents.component.html',
  styleUrls: ['./basic-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicContentsComponent extends CommonContentsComponent implements OnInit {
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
    this.setMenuNames(BasicMenuTypeValues);
  }

  protected onMenuItemClickListener(menuName: string) {
    let targetElementRef: ElementRef<HTMLElement>;

    switch (menuName as BasicMenuType) {
      case BasicMenuType.WELCOME:
        targetElementRef = this.welcomeElementRef;
        break;
      case BasicMenuType.PROFILE:
        targetElementRef = this.profileElementRef;
        break;
      case BasicMenuType.ABOUT:
        targetElementRef = this.aboutElementRef;
        break;
      case BasicMenuType.PROJECT:
        targetElementRef = this.projectElementRef;
        break;
    }

    this.scrollAt(targetElementRef);
  }

  protected isBackButtonVisible(): boolean {
    return false;
  }

  public get basicContentsData(): BasicContentsData {
    return this.getResolveData(ResolveKey.BASIC_CONTENTS);
  }

  public get appIconPathFinder(): AppIconPathFinder {
    return this.getResolveData(ResolveKey.APP_ICON);
  }
}
