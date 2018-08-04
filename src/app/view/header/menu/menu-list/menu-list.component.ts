import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuListItem} from "./menu-list.item";
import {MenuListAnimator} from "./menu-list.animator";
import {AnimationBuilder} from "@angular/animations";

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {

  public readonly menuItems : Array<MenuListItem> = MenuListItem.values();

  private isMenuItemShown : boolean = false;

  @Output('menuListItemClick')
  private readonly menuListItemClickEmitter : EventEmitter<MenuListItem> = new EventEmitter<MenuListItem>();

  @ViewChild('nav', {read:ElementRef})
  private readonly navElementRef : ElementRef;

  private readonly menuListAnimator : MenuListAnimator;

  constructor(private animationBuilder : AnimationBuilder, private changeDetector : ChangeDetectorRef) {
    this.menuListAnimator = new MenuListAnimator(this.animationBuilder);
  }

  public showMenuItemList(animate : boolean) : void {
    this.showElement();
    console.log(this.getNativeListElement());
    if ( animate ) {
      this.menuListAnimator.animateShowMenuList(this.getNativeListElement());
    }
  }

  public hideMenuItemList(animate : boolean) : void {
    if ( animate ) {
      this.menuListAnimator.animateHideMenuList(this.getNativeListElement(), ()=> this.hideElement());
    } else {
      this.hideElement();
    }
  }

  public isItemShown() : boolean {
    return this.isMenuItemShown;
  }

  public menuItemClickEvent(menuListItem : MenuListItem) : void {
    this.menuListItemClickEmitter.emit(menuListItem);
  }

  public showElement() : void {
    this.isMenuItemShown = true;
    this.changeDetector.detectChanges();
  }

  public hideElement() : void {
    this.isMenuItemShown = false;
    this.changeDetector.detectChanges();
  }

  private getNativeListElement() : HTMLElement {
    return this.navElementRef.nativeElement;
  }
}
