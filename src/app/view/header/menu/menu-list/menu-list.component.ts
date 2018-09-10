import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuListAnimator} from './menu-list.animator';
import {AnimationBuilder} from '@angular/animations';
import {HeaderMenuListEventService} from '../../header-menu-list-event.service';

export enum HeaderMenu {
  PROFILE = 'profile',
  ABOUT = 'about',
  PORTFOLIO = 'portfolio',
  BLOG = 'blog',
  GITHUB = 'github'
}

@Component({
  selector: 'view-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
/** ngIf 기능을 쓰지 않고, css display style로 nav 숨김처리 하는 이유는 아래와 같다.
 * App이 제공하는 템플릿이 가상으로 Header를 복사하는데, 이때, Angular Event로 처리한 요소가 제대로 반영되지 않는다.
 * 뷰포트를 줄일때, ngIf가 제대로 반영되지 않아, nav가 펼쳐진채 작동하므로, css로 이를 처리함. */
export class MenuListComponent {
  public readonly menuItemNames : string[] = Object.keys(HeaderMenu);

  @Output('menuListItemClick')
  private readonly menuListItemClickEmitter : EventEmitter<HeaderMenu> = new EventEmitter<HeaderMenu>();

  @ViewChild('nav') private readonly navElementRef : ElementRef;

  private readonly menuListAnimator : MenuListAnimator;

  constructor(private animBuilder    : AnimationBuilder,
              private changeDetector : ChangeDetectorRef,
              private eventService   : HeaderMenuListEventService) {
    this.menuListAnimator = new MenuListAnimator(this.animBuilder);
  }

  public showMenuItemList(animate : boolean) : void {
    this.showElement();
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

  public menuItemClickEvent(menuName : string) : void {
    const selectedHeaderMenu : HeaderMenu = HeaderMenu[menuName];
    (this.eventService as any)._notifyEvent(selectedHeaderMenu);
    this.menuListItemClickEmitter.emit(selectedHeaderMenu);
  }

  public showElement() : void {
    this.getNativeListElement().style.display = 'block';
    this.changeDetector.detectChanges();
  }

  public hideElement() : void {
    this.getNativeListElement().style.display = 'none';
    this.changeDetector.detectChanges();
  }

  private getNativeListElement() : HTMLElement {
    return this.navElementRef.nativeElement;
  }
}
