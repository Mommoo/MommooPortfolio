import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {WindowSizeEventHandler} from '../../../../mommoo-library/handler/window/size/window-size-handler';
import {MenuButtonEvent, MenuButtonState, OnHeaderMenuEventChangeListener} from './header.types';
import {CollapsibleBoxComponent} from './collapsible-box/collapsible-box.component';
import {BasicViewportSizeState} from '../../../../mommoo-library/handler/window/size/window-size-handler.type';
import {DomSanitizer} from '@angular/platform-browser';
import {HeaderMenuController} from './header-menu-controller.service';
import {Router} from '@angular/router';
import {AppResourceFinder} from '../../../app.types';
import {ImageResourceType} from '../../../server/resource/resource.types';

/**
 * This class is mediator class
 * that convey event user event to event-provider
 * and response of event-provider's ui display request
 *
 * The event-provider is {@link HeaderMenuController}
 * and it is have to be connected to this class. {@link OnInit}
 */

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  private _menuNames: string[];

  private _isBackButtonVisible = false;

  private headerModeViewStateChangeID;
  private onHeaderMenuControlListener: OnHeaderMenuEventChangeListener;

  @ViewChild(MenuButtonComponent)
  private menuButtonComponent: MenuButtonComponent;

  @ViewChild(MenuListComponent)
  private menuListComponent: MenuListComponent;

  @ViewChild(CollapsibleBoxComponent)
  private animationBoxComponent: CollapsibleBoxComponent;

  @Input()
  private appResourceFinder: AppResourceFinder;

  public constructor(private headerMenuController: HeaderMenuController,
                     private changeDetector: ChangeDetectorRef,
                     private router: Router,
                     private sanitizer: DomSanitizer) {

  }

  private static isCollapseMode() {
    return WindowSizeEventHandler.getBasicViewportSizeState() !== BasicViewportSizeState.LARGE;
  }

  private enrollHeaderModeViewStateChange() {
    return WindowSizeEventHandler.addBasicViewportSizeStateChangeEvent(() => {
      const isNotCollapseMode = !HeaderComponent.isCollapseMode();
      const isButtonStateOpened = this.menuButtonComponent.getMenuButtonState() === MenuButtonState.OPENED;

      const isNeedToBoxExpanded = isNotCollapseMode || isButtonStateOpened;

      const executeType = isNeedToBoxExpanded ? 'expand' : 'collapse';
      this.animationBoxComponent.start(executeType, false);
      this.changeDetector.detectChanges();
    }, true);
  }

  private triggerHeaderCollapseIfInCollapseMode() {
    if (HeaderComponent.isCollapseMode()) {
      /** button animation will trigger @{#afterMenuButtonClickEvent}
       * After that method, header wii be collapsed */
      this.menuButtonComponent.executeButtonEvent(MenuButtonEvent.CLOSE);
    }
  }

  private getSecurityImagePath(iconType: ImageResourceType) {
    return this.sanitizer
      .bypassSecurityTrustResourceUrl(`${this.appResourceFinder.icon.get(iconType)}`);
  }

  public ngOnInit(): void {
    const self = this;
    this.onHeaderMenuControlListener = {
      onBackButtonVisibleChangeListener(isBackButtonVisible: boolean): void {
        self._isBackButtonVisible = isBackButtonVisible;
        self.changeDetector.detectChanges();
      },
      onMenuNamesChangeListener(menuNames: string[]): void {
        self._menuNames = menuNames;
        self.changeDetector.detectChanges();
      }
    };
    this.headerMenuController.addOnHeaderMenuEventChangeListener(this.onHeaderMenuControlListener);
  }

  public ngAfterViewInit(): void {
    this.headerModeViewStateChangeID = this.enrollHeaderModeViewStateChange();
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvent(this.headerModeViewStateChangeID);
    this.headerMenuController.removeOnHeaderMenuEventChangeListener(this.onHeaderMenuControlListener);
  }

  public afterMenuButtonClickEvent(menuButtonEvent: MenuButtonEvent): void {
    const isNeedToBoxExpanded = menuButtonEvent === MenuButtonEvent.OPEN;
    const executeType = isNeedToBoxExpanded ? 'expand' : 'collapse';
    this.animationBoxComponent.start(executeType, true);
  }

  public afterMenuListItemClickEvent(menuName: string): void {
    this.triggerHeaderCollapseIfInCollapseMode();
    this.headerMenuController.notifyMenuNameClickEvent(menuName);
  }

  public afterBackButtonClickEvent() {
    this.triggerHeaderCollapseIfInCollapseMode();
    this.headerMenuController.notifyBackButtonClickEvent();
  }

  public doHeaderLogoClick() {
    this.router.navigate(['main']);
  }

  public get isBackButtonVisible() {
    return this._isBackButtonVisible;
  }

  public get logoImagePath() {
    return this.getSecurityImagePath(ImageResourceType.LOGO);
  }

  public get backButtonImagePath() {
    return this.getSecurityImagePath(ImageResourceType.ARROW_BACK);
  }

  public get menuNames() {
    return this._menuNames;
  }
}
