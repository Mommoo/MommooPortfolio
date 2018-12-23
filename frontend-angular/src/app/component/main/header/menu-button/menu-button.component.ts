import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuButtonEvent, MenuButtonState} from '../header.types';
import {MenuButtonAnimator} from './menu-button-animator.service';

@Component({
  selector: 'view-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent {
  private menuButtonState : MenuButtonState = MenuButtonState.CLOSED;

  @ViewChild('menuTop')
  private menuTopElementRef : ElementRef<HTMLElement>;

  @ViewChild('menuMiddle')
  private menuMiddleElementRef : ElementRef<HTMLElement>;

  @ViewChild('menuBottom')
  private menuBottomElementRef : ElementRef<HTMLElement>;

  @Output('menuButtonEvent')
  private menuButtonEventEmitter : EventEmitter<MenuButtonEvent> = new EventEmitter<MenuButtonEvent>();

  constructor(private menuButtonAnimator: MenuButtonAnimator) {}

  public getMenuButtonState(): MenuButtonState {
    return this.menuButtonState;
  }

  public executeButtonOpen() {
    this.executeButtonEvent(MenuButtonEvent.OPEN);
  }

  public executeButtonClose() {
    this.executeButtonEvent(MenuButtonEvent.CLOSE);
  }

  public toggleButtonEvent() {
    if ( this.isPenddingToggle() ) {
      return ;
    }
    const shouldBeExecuteButtonEvent = this.isButtonClosed() ? MenuButtonEvent.OPEN : MenuButtonEvent.CLOSE;
    this.executeButtonEvent(shouldBeExecuteButtonEvent);
  }

  private executeButtonEvent(buttonEvent: MenuButtonEvent) {
    this.menuButtonEventEmitter.emit(buttonEvent);

    const menuLineElementRefs = [
      this.menuTopElementRef,
      this.menuMiddleElementRef,
      this.menuBottomElementRef
    ];

    const animationType = buttonEvent === MenuButtonEvent.OPEN ? 'normal' : 'reverse';
    this.menuButtonAnimator.startAnimation(animationType, menuLineElementRefs, ()=> this.updateButtonState());
  }

  private isButtonClosed() {
    return this.menuButtonState === MenuButtonState.CLOSED;
  }

  private isPenddingToggle() {
    return this.menuButtonAnimator.isAnimationPending();
  }

  private updateButtonState() {
    this.menuButtonState = this.isButtonClosed() ? MenuButtonState.OPENED : MenuButtonState.CLOSED;
  }
}
