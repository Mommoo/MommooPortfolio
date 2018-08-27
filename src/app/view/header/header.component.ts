import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MenuListItem} from './menu/menu-list/menu-list.item';
import {MenuButtonComponent, MenuButtonEvent, MenuButtonState} from './menu/menu-button/menu-button.component';
import {MenuListComponent} from './menu/menu-list/menu-list.component';
import {ViewportDimension, WindowEventService} from '../../common/window-event.service';

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output('menuListItemClick') menuItemClickEmitter: EventEmitter<MenuListItem> = new EventEmitter<MenuListItem>();

  @ViewChild(MenuButtonComponent) menuButtonComponent: MenuButtonComponent;
  @ViewChild(MenuListComponent) menuListComponent: MenuListComponent;

  @ViewChild('title') titleElementRef : ElementRef;

  constructor(private windowEventService: WindowEventService,
              private hostElement : ElementRef) {
  }


  ngOnInit() {

    setTimeout(() => {

      this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {
        switch (viewportDimension) {
          case ViewportDimension.DESKTOP :
            this.menuListComponent.showMenuItemList(false);
            break;

          case ViewportDimension.TABLET :
          case ViewportDimension.MOBILE :
            if (this.menuButtonComponent.getMenuButtonState() === MenuButtonState.OPENED) {
              this.menuListComponent.showMenuItemList(false);
            } else {
              this.menuListComponent.hideMenuItemList(false);
            }
            break;
        }
      }, true);

    }, 0);
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

  public getHeaderHeight() : number {
    if ( WindowEventService.isDesktopViewport() ) {
      return this.hostElement.nativeElement.offsetHeight;
    } else {
      return this.titleElementRef.nativeElement.offsetHeight;
    }
  }

  public fireMenuListItemClickEvent(menuItem: MenuListItem): void {
    this.menuItemClickEmitter.emit(menuItem);
    if ( !WindowEventService.isDesktopViewport() ) {
      this.menuButtonComponent.buttonAnimate();
      this.menuListComponent.hideMenuItemList(true);
    }
  }
}
