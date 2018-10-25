import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {PageNavigator} from '../../contents/route/page.navigator.service';
import {HeaderEventPublisher} from '../header-event-publisher.service';

@Component({
  selector: 'view-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnDestroy{
  public menuItemNames : string[];

  @Output('menuListItemClick')
  private readonly menuListItemClickEmitter : EventEmitter<string> = new EventEmitter<string>();

  private readonly pageChangeEventID;

  constructor(private changeDetector: ChangeDetectorRef,
              private pageNavigator: PageNavigator,
              private headerEventPublisher: HeaderEventPublisher) {

    this.menuItemNames = this.pageNavigator.getRootPage().headerMenuItems;
    this.pageChangeEventID = this.pageNavigator.subscribe(page=> {
      this.menuItemNames = page.headerMenuItems;
      this.changeDetector.detectChanges();
    })
  }

  public menuItemClickEvent(menuItemName : string) : void {
    this.menuListItemClickEmitter.emit(menuItemName);
    this.headerEventPublisher.publishMenuItemClickEvent(menuItemName);
  }

  public ngOnDestroy(): void {
    this.pageNavigator.unSubscribe(this.pageChangeEventID);
  }
}
