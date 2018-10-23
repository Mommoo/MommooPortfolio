import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuButtonEvent, MenuButtonState} from '../../types';
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
  private menuTopElementRef : ElementRef;

  @ViewChild('menuMiddle')
  private menuMiddleElementRef : ElementRef;

  @ViewChild('menuBottom')
  private menuBottomElementRef : ElementRef;

  @Output('menuButtonEvent')
  private menuButtonEventEmitter : EventEmitter<MenuButtonEvent> = new EventEmitter<MenuButtonEvent>();

  constructor(private menuButtonAnimator: MenuButtonAnimator) {

  }

  public buttonAnimate(){
    if ( this.menuButtonAnimator.isAnimationPending() ) {
      return ;
    }

    this.menuButtonEventEmitter.emit(this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonEvent.OPEN : MenuButtonEvent.CLOSE);

    const updateState = () => {
      this.menuButtonState = this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonState.OPENED : MenuButtonState.CLOSED
    };

    if ( this.menuButtonState === MenuButtonState.CLOSED ) {
      this.menuButtonAnimator.startNormalAnimation(this.menuLineElementRefs(), ()=> updateState());
    } else {
      this.menuButtonAnimator.startReverseAnimation(this.menuLineElementRefs(), ()=> updateState());
    }
  }

  public getMenuButtonState() : MenuButtonState {
    return this.menuButtonState;
  }

  private menuLineElementRefs() {
    return [
      this.menuTopElementRef,
      this.menuMiddleElementRef,
      this.menuBottomElementRef
    ]
  }
}
