import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuListAnimator} from './menu-list.animator';
import {AnimationBuilder} from '@angular/animations';
import {HeaderMenuListEventService} from '../../header-menu-list-event.service';
import {HeaderMenu} from '../../types';

@Component({
  selector: 'view-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  public readonly menuItemNames : string[] = Object.keys(HeaderMenu);
  private _isVisible : boolean = true;

  @Output('menuListItemClick')
  private readonly menuListItemClickEmitter : EventEmitter<HeaderMenu> = new EventEmitter<HeaderMenu>();

  @ViewChild('nav') private readonly navElementRef : ElementRef;

  constructor(private changeDetector   : ChangeDetectorRef,
              private menuListAnimator : MenuListAnimator,
              private headerMenuEventEmitter : HeaderMenuListEventService) {
  }

  public showMenuItemList(animate : boolean) : void {
    this.setVisibility(true);
    if ( animate ) {
      this.menuListAnimator.animateShowMenuList(this.getNativeListElement());
    }
  }

  public hideMenuItemList(animate : boolean) : void {
    if ( animate ) {
      this.menuListAnimator.animateHideMenuList(this.getNativeListElement(), ()=> this.setVisibility(false));
    } else {
      this.setVisibility(false);
    }
  }

  public menuItemClickEvent(menuName : string) : void {
    const selectedHeaderMenu : HeaderMenu = HeaderMenu[menuName];
    this.headerMenuEventEmitter.notifyEvent(selectedHeaderMenu);
    this.menuListItemClickEmitter.emit(selectedHeaderMenu);
  }

  private getNativeListElement() : HTMLElement {
    return this.navElementRef.nativeElement;
  }

  public setVisibility(visible : boolean) {
    this._isVisible = visible;
    this.changeDetector.detectChanges();
  }

  public isVisible() : boolean {
    return this._isVisible;
  }
}
