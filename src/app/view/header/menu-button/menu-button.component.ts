import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuButtonEvent, MenuButtonState} from '../types';
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

  public buttonAnimate() {
    if ( this.menuButtonAnimator.isAnimationPending() ) {
      return ;
    }

    const occurEvent = this.isButtonClosed() ? MenuButtonEvent.OPEN : MenuButtonEvent.CLOSE;
    this.menuButtonEventEmitter.emit(occurEvent);

    const menuLineElementRefs = [
      this.menuTopElementRef,
      this.menuMiddleElementRef,
      this.menuBottomElementRef
    ];

    const animationType = this.isButtonClosed() ? 'normal' : 'reverse';
    this.menuButtonAnimator.startAnimation(animationType, menuLineElementRefs, ()=> this.updateButtonState());
  }

  public getMenuButtonState(): MenuButtonState {
    return this.menuButtonState;
  }

  private isButtonClosed() {
    return this.menuButtonState === MenuButtonState.CLOSED;
  }

  private updateButtonState() {
    this.menuButtonState = this.isButtonClosed() ? MenuButtonState.OPENED : MenuButtonState.CLOSED;
  }
}
