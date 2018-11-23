import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import {MenuButtonComponent} from './menu-button/menu-button.component';
import {MenuListComponent} from './menu-list/menu-list.component';
import {WindowEventHandler} from '../../../mommoo-library/handler/window/window-event';
import {ViewportSize} from '../../../mommoo-library/handler/window/type';
import {MenuButtonEvent, MenuButtonState} from './types';
import {AnimationBoxComponent} from './animation-box/animation-box.component';

@Component({
  selector: 'view-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  public readonly headerTitle : string = `Mommoo\nPortfolio`;

  private menuButtonStatusChangeEventID;

  @ViewChild(MenuButtonComponent)
  private menuButtonComponent: MenuButtonComponent;

  @ViewChild(MenuListComponent)
  private menuListComponent: MenuListComponent;

  @ViewChild(AnimationBoxComponent)
  private animationBoxComponent: AnimationBoxComponent;

  constructor(private changeDetector: ChangeDetectorRef) {}

  private buildMenuListStatus(viewportSize: ViewportSize): void {
    /** desktop mode or when user clicked menu button */
    const isNeedToBoxExpanded = (viewportSize === ViewportSize.DESKTOP) ||
      (this.menuButtonComponent.getMenuButtonState() === MenuButtonState.OPENED);

    const executeType = isNeedToBoxExpanded ? 'expand' : 'collapse';
    this.animationBoxComponent.start(executeType, false);
  }

  public triggerMenuButtonEvent(menuButtonEvent: MenuButtonEvent): void {
    const isNeedToBoxExpanded = menuButtonEvent === MenuButtonEvent.OPEN;
    const executeType = isNeedToBoxExpanded ? 'expand' : 'collapse';
    this.animationBoxComponent.start(executeType, true);
  }

  public triggerMenuListItemClickEvent(): void {
    if ( WindowEventHandler.getViewportSize() !== ViewportSize.DESKTOP ) {
      this.menuButtonComponent.buttonAnimate();
      this.animationBoxComponent.startCollapse(true);
    }
  }

  public ngAfterViewInit(): void {
    this.menuButtonStatusChangeEventID =
      WindowEventHandler.addViewportChangeEvent(viewportSize => {
        this.buildMenuListStatus(viewportSize);
        this.changeDetector.detectChanges();
      }, true);
  }

  public ngOnDestroy(): void {
    WindowEventHandler.removeEvent(this.menuButtonStatusChangeEventID);
  }
}
