import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MenuButtonComponent, MenuButtonEvent, MenuButtonState} from './menu/menu-button/menu-button.component';
import {ViewportDimension, WindowEventService} from '../../common/window-event.service';
import {MenuListComponent} from './menu/menu-list/menu-list.component';

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements AfterViewInit{
  @ViewChild(MenuButtonComponent) private menuButtonComponent: MenuButtonComponent;
  @ViewChild(MenuListComponent)   private menuListComponent: MenuListComponent;

  constructor(private windowEventService: WindowEventService, private changeDetector : ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {
      this.buildMenuListStatus(viewportDimension);
      this.changeDetector.detectChanges();
    }, true);
  }

  private buildMenuListStatus(viewportDimen : ViewportDimension) : void {
    switch (viewportDimen) {
      case ViewportDimension.DESKTOP :
        this.menuListComponent.showMenuItemList(false);
        break;

      case ViewportDimension.TABLET :
      case ViewportDimension.MOBILE :
        if ( this.menuButtonComponent.getMenuButtonState() === MenuButtonState.OPENED ) {
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
    if ( !WindowEventService.isDesktopViewport() ) {
      this.menuButtonComponent.buttonAnimate();
      this.menuListComponent.hideMenuItemList(true);
    }
  }
}
