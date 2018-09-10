import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AnimationBuilder} from '@angular/animations';
import {MenuButtonAnimator} from './menu-button.animator';

export const enum MenuButtonState {
  OPENED,
  CLOSED
}

export const enum MenuButtonEvent {
  OPEN,
  CLOSE
}

@Component({
  selector: 'view-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent implements OnInit{

  private menuButtonState : MenuButtonState = MenuButtonState.CLOSED;
  private isMenuButtonAnimStart : boolean = false;

  @ViewChild('menuTop')
  private menuTopElementRef : ElementRef;

  @ViewChild('menuMiddle')
  private menuMiddleElementRef : ElementRef;

  @ViewChild('menuBottom')
  private menuBottomElementRef : ElementRef;

  @Output('menuButtonEvent')
  private menuButtonEventEmitter : EventEmitter<MenuButtonEvent> = new EventEmitter<MenuButtonEvent>();

  constructor(private animationBuilder : AnimationBuilder) {

  }

  ngOnInit() {
  }

  public buttonAnimate(){
    if ( this.isMenuButtonAnimStart ) {
      return ;
    }

    this.isMenuButtonAnimStart = true;

    this.menuButtonEventEmitter.emit(this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonEvent.OPEN : MenuButtonEvent.CLOSE);

    new MenuButtonAnimator(this.animationBuilder, this.menuButtonState)
      .onDone(()=> {
        this.isMenuButtonAnimStart = false;
        this.menuButtonState = this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonState.OPENED : MenuButtonState.CLOSED;
      })
      .playTogether(this.menuTopElementRef.nativeElement, this.menuMiddleElementRef.nativeElement, this.menuBottomElementRef.nativeElement);
  }

  public getMenuButtonState() : MenuButtonState {
    return this.menuButtonState;
  }
}
