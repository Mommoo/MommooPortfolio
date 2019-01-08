import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {MainCommonAnimator} from '../../main.common-animator.service';
import {AnimationType} from '../../main.types';

/**
 * This class display menu view with fade-in animation and provides menu item click event
 */
@Component({
  selector: 'view-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  private _menuNames: string[];

  @Output('menuListItemClick')
  private readonly menuListItemClickEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(private commonKeyframeAnimator: MainCommonAnimator,
              private hostElementRef: ElementRef<HTMLElement>) {
  }

  @Input('menuNames')
  public set menuNames(menuNames: string[]) {
    this._menuNames = menuNames;
    this.commonKeyframeAnimator.startAnimation(AnimationType.FADE_IN, this.hostElementRef);
  }

  public get menuNames() {
    return this._menuNames;
  }

  public menuItemClickEvent(menuName: string): void {
    this.menuListItemClickEmitter.emit(menuName);
  }
}
