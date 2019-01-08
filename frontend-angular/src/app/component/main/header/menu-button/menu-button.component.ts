import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MenuButtonEvent, MenuButtonState} from '../header.types';
import {MenuButtonAnimator} from './menu-button-animator.service';
import {DomUtils} from '../../../../../mommoo-library/util/dom';

/**
 * This class decide that both hamburger shape menu's style and host element dimension
 *
 * The host style properties are {@link hostWidth}, {@link hostHeight}
 * The hamburger menu's style properties are {@link lineWidth}, {@link lineHeight} and {@link lineGutter}.
 *
 * It is also can invoking hamburger menu's animation used by MenuButtonAnimator
 * {@link MenuButtonAnimator}
 */
@Component({
  selector: 'header-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent implements OnInit {
  private static readonly lineWidth = 30;
  private static readonly lineHeight = 3;
  private static readonly lineGutter = 5;

  @HostBinding('style.width.px')
  private readonly hostWidth = MenuButtonComponent.lineWidth;

  @HostBinding('style.height.px')
  private readonly hostHeight = (MenuButtonComponent.lineHeight * 3) + (MenuButtonComponent.lineGutter * 2);

  private menuButtonState: MenuButtonState = MenuButtonState.CLOSED;

  private menuButtonAnimator: MenuButtonAnimator;

  @ViewChild('menuTop')
  private menuTopElementRef: ElementRef<HTMLElement>;

  @ViewChild('menuMiddle')
  private menuMiddleElementRef: ElementRef<HTMLElement>;

  @ViewChild('menuBottom')
  private menuBottomElementRef: ElementRef<HTMLElement>;

  @Output('menuButtonEvent')
  private menuButtonEventEmitter: EventEmitter<MenuButtonEvent> = new EventEmitter<MenuButtonEvent>();

  public constructor() {
    this.menuButtonAnimator
      = new MenuButtonAnimator(MenuButtonComponent.lineHeight, MenuButtonComponent.lineGutter);
  }

  private isButtonClosed() {
    return this.menuButtonState === MenuButtonState.CLOSED;
  }

  @HostListener('click')
  private toggleButtonEvent() {
    if (this.menuButtonAnimator.isAnimationPending()) {
      return;
    }
    const shouldBeExecuteButtonEvent = this.isButtonClosed() ? MenuButtonEvent.OPEN : MenuButtonEvent.CLOSE;
    this.executeButtonEvent(shouldBeExecuteButtonEvent);
  }

  private updateButtonState() {
    this.menuButtonState = this.isButtonClosed() ? MenuButtonState.OPENED : MenuButtonState.CLOSED;
  }

  private get menuLineElementRefs() {
    return [
      this.menuTopElementRef,
      this.menuMiddleElementRef,
      this.menuBottomElementRef
    ];
  }

  private setMenuLinesStyle() {
    this.menuLineElementRefs.forEach((elementRef, index) => DomUtils.applyStyle(elementRef, {
      width: `${MenuButtonComponent.lineWidth}px`,
      height: `${MenuButtonComponent.lineHeight}px`,
      top: `${(MenuButtonComponent.lineHeight + MenuButtonComponent.lineGutter) * index}px`
    }));
  }

  public ngOnInit(): void {
    this.setMenuLinesStyle();
  }

  public getMenuButtonState(): MenuButtonState {
    return this.menuButtonState;
  }

  public executeButtonEvent(buttonEvent: MenuButtonEvent) {
    this.menuButtonEventEmitter.emit(buttonEvent);

    const animationType = buttonEvent === MenuButtonEvent.OPEN ? 'normal' : 'reverse';
    this.menuButtonAnimator
      .startAnimation(animationType, this.menuLineElementRefs, () => this.updateButtonState());
  }
}
