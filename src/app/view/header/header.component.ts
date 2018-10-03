import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MenuButtonComponent} from './menu/menu-button/menu-button.component';
import {MenuListComponent} from './menu/menu-list/menu-list.component';
import {WindowEventHandler} from '../../mommoo-library/handler/window/window-event';
import {ViewportSize} from '../../mommoo-library/handler/window/type';
import {MenuButtonEvent, MenuButtonState} from './types';

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements AfterViewInit, OnDestroy {
  private menuButtonStatusChangeEventID;

  @ViewChild(MenuButtonComponent) private menuButtonComponent: MenuButtonComponent;
  @ViewChild(MenuListComponent) private menuListComponent: MenuListComponent;

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.menuButtonStatusChangeEventID = WindowEventHandler
      .addViewportChangeEvent(viewportSize => {
        this.buildMenuListStatus(viewportSize);
        this.changeDetector.detectChanges();
      }, true);
  }

  private buildMenuListStatus(viewportSize: ViewportSize): void {
    switch (viewportSize) {
      case ViewportSize.DESKTOP :
        this.menuListComponent.showMenuItemList(false);
        break;

      case ViewportSize.TABLET :
      case ViewportSize.MOBILE :
        if (this.menuButtonComponent.getMenuButtonState() === MenuButtonState.OPENED) {
          this.menuListComponent.showMenuItemList(false);
        } else {
          this.menuListComponent.hideMenuItemList(false);
        }
        break;
    }
  }

  public fireMenuButtonEvent(menuButtonEvent: MenuButtonEvent): void {
    switch (menuButtonEvent) {
      case MenuButtonEvent.OPEN :
        this.menuListComponent.showMenuItemList(true);
        break;
      case MenuButtonEvent.CLOSE :
        this.menuListComponent.hideMenuItemList(true);
        break;
    }
  }

  public fireMenuListItemClickEvent(): void {
    if ( WindowEventHandler.getViewportSize() === ViewportSize.DESKTOP ) {
      this.menuButtonComponent.buttonAnimate();
      this.menuListComponent.hideMenuItemList(true);
    }
  }

  ngOnDestroy(): void {
    WindowEventHandler.removeEvent(this.menuButtonStatusChangeEventID);
  }
}
