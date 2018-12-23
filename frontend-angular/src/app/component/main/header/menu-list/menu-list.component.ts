import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HeaderMenuController} from '../header-menu-controller.service';
import {OnMenuItemsChangedListener} from '../header.types';

@Component({
  selector: 'view-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {
  public menuItemNames: string[];

  @Output('menuListItemClick')
  private readonly menuListItemClickEmitter: EventEmitter<string> = new EventEmitter<string>();

  private readonly onMenuItemsChangedListener: OnMenuItemsChangedListener;

  constructor(private headerMenuController: HeaderMenuController, changeDetector: ChangeDetectorRef) {
    this.onMenuItemsChangedListener = menuItems => {
      this.menuItemNames = menuItems;
      changeDetector.detectChanges();
    };
  }

  public ngOnInit(): void {
    this.headerMenuController.addOnMenuItemsChangedListener(this.onMenuItemsChangedListener);
  }

  public ngOnDestroy(): void {
    this.headerMenuController.removeMenuItemsChangeListener(this.onMenuItemsChangedListener);
  }

  public menuItemClickEvent(menuItemName: string): void {
    this.menuListItemClickEmitter.emit(menuItemName);
    this.headerMenuController.notifyMenuItemClickEvent(menuItemName);
  }
}
