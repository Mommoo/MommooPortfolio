import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {WindowSizeEventHandler} from '../../../../mommoo-library/handler/window/size/window-size-handler';
import {MenuButtonEvent, MenuButtonState} from './header.types';
import {AnimationBoxComponent} from './animation-box/animation-box.component';
import {BasicViewportSizeState} from '../../../../mommoo-library/handler/window/size/window-size-handler.type';

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  public readonly headerTitle: string = `Mommoo\nPortfolio`;

  public isBackButtonVisible = false;

  private menuButtonStatusChangeEventID;

  @ViewChild(MenuButtonComponent)
  private menuButtonComponent: MenuButtonComponent;

  @ViewChild(MenuListComponent)
  private menuListComponent: MenuListComponent;

  @ViewChild(AnimationBoxComponent)
  private animationBoxComponent: AnimationBoxComponent;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  private buildMenuListStatus(basicViewportSizeState: BasicViewportSizeState): void {
    const isWindowSizeNotLarge = basicViewportSizeState !== BasicViewportSizeState.LARGE;
    const isWindowSizeLarge = basicViewportSizeState === BasicViewportSizeState.LARGE;
    const isButtonStateOpened = this.menuButtonComponent.getMenuButtonState() === MenuButtonState.OPENED;

    const isButtonOpenedPreviousInWindowSizeNotLarge = (isWindowSizeNotLarge && isButtonStateOpened);
    const isNeedToBoxExpanded = isWindowSizeLarge || isButtonOpenedPreviousInWindowSizeNotLarge;

    const executeType = isNeedToBoxExpanded ? 'expand' : 'collapse';
    this.animationBoxComponent.start(executeType, false);
  }

  private checkBackButtonVisibility() {
    // const currentPageIsRootPage = this.pageNavigator.getPageHistory().length === 1;
    // this.isBackButtonVisible = !currentPageIsRootPage;
    // this.changeDetector.detectChanges();
  }

  private triggerHeaderCloseEventWhenWindowSizeNotLarge() {
    const isWindowSizeNotLarge = WindowSizeEventHandler.getBasicViewportSizeState() !== BasicViewportSizeState.LARGE;
    if ( isWindowSizeNotLarge ) {
      /** button animation will trigger @{#afterMenuButtonClickEvent}
       * After that method, header wii be collapsed */
      this.menuButtonComponent.executeButtonClose();
    }
  }

  public afterMenuButtonClickEvent(menuButtonEvent: MenuButtonEvent): void {
    const isNeedToBoxExpanded = menuButtonEvent === MenuButtonEvent.OPEN;
    const executeType = isNeedToBoxExpanded ? 'expand' : 'collapse';
    this.animationBoxComponent.start(executeType, true);
  }

  public afterMenuListItemClickEvent(): void {
    this.triggerHeaderCloseEventWhenWindowSizeNotLarge();
  }

  public afterBackButtonClickEvent() {
    this.triggerHeaderCloseEventWhenWindowSizeNotLarge();
    // this.pageNavigator.moveToPreviousPage();
  }

  public ngAfterViewInit(): void {
    this.menuButtonStatusChangeEventID =
      WindowSizeEventHandler.addBasicViewportSizeStateChangeEvent(basicViewportSizeState => {
        this.buildMenuListStatus(basicViewportSizeState);
        this.changeDetector.detectChanges();
      }, true);
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvent(this.menuButtonStatusChangeEventID);
    // this.pageNavigator.unSubscribe(this.pageChangeEventID);
  }
}
