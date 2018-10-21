import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {MenuButtonState} from '../../types';

export class MenuButtonAnimator{
  private static readonly DURATION : number = 300;
  private static readonly EASE_IN_TIMING : string = `${MenuButtonAnimator.DURATION}ms ease-in`;
  private static readonly EASE_OUT_TIMING : string = `${MenuButtonAnimator.DURATION}ms ease-out`;
  private onDoneListener : (buttonAnimator : MenuButtonAnimator)=>void = ()=>{};

  public constructor(private animationBuilder : AnimationBuilder, private menuButtonState : MenuButtonState){

  }

  public playTogether (topMenuElem : HTMLElement, middleMenuElem : HTMLElement, bottomMenuElem : HTMLElement) : void {
    const animPlayers : Array<AnimationPlayer> = [];
    animPlayers.push(this.createTopMenuAnimPlayer(topMenuElem));
    animPlayers.push(this.createMiddleMenuAnimPlayer(middleMenuElem));
    animPlayers.push(this.createBottomMenuAnimPlayer(bottomMenuElem));

    let doneCnt = 0;
    animPlayers.forEach(animPlayer => {

      animPlayer.onDone(()=>{
        if ( ++ doneCnt == animPlayers.length ) {
          this.onDoneListener(this);
        }
      });

      animPlayer.play();
    });
  }

  public onDone(onDoneListener : (buttonAnimator : MenuButtonAnimator)=> void) : MenuButtonAnimator {
    this.onDoneListener = onDoneListener;
    return this;
  }

  public destroy() {
    // this.animPlayers.forEach(animPlayer=> animPlayer.clear());
  }

  private static getAnimationTiming(buttonState: MenuButtonState): string {
    return buttonState === MenuButtonState.CLOSED ?
      MenuButtonAnimator.EASE_IN_TIMING :
      MenuButtonAnimator.EASE_OUT_TIMING
  }

  private createTopMenuAnimPlayer(topMenuElem : HTMLElement) : AnimationPlayer {
    return this.animationBuilder.build([
      style({
        transform : this.menuButtonState === MenuButtonState.CLOSED ? 'rotate(0deg)' : 'rotate(-405deg)'
      }),
      animate(this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonAnimator.EASE_IN_TIMING : MenuButtonAnimator.EASE_OUT_TIMING,
        style({
          transform : this.menuButtonState === MenuButtonState.CLOSED ? 'rotate(-405deg)' : 'rotate(0deg)',
          top : this.menuButtonState === MenuButtonState.CLOSED ? '10px' : '0px'
        }))
    ]).create(topMenuElem);
  }

  private createMiddleMenuAnimPlayer(middleMenuElem : HTMLElement) : AnimationPlayer {
    return this.animationBuilder.build([
      style({
        opacity : this.menuButtonState === MenuButtonState.CLOSED ? 1 : 0
      }),
      animate(this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonAnimator.EASE_IN_TIMING : MenuButtonAnimator.EASE_OUT_TIMING,
        style({
          opacity : this.menuButtonState === MenuButtonState.CLOSED ? 0 : 1,
        }))
    ]).create(middleMenuElem)
  }

  private createBottomMenuAnimPlayer(bottomMenuElem : HTMLElement) : AnimationPlayer {
    return this.animationBuilder.build([
      style({
        transform : this.menuButtonState === MenuButtonState.CLOSED ? 'rotate(0deg)' : 'rotate(405deg)'
      }),
      animate(this.menuButtonState === MenuButtonState.CLOSED ? MenuButtonAnimator.EASE_IN_TIMING : MenuButtonAnimator.EASE_OUT_TIMING,
        style({
          transform : this.menuButtonState === MenuButtonState.CLOSED ? 'rotate(405deg)' : 'rotate(0deg)',
          top : this.menuButtonState === MenuButtonState.CLOSED ? '10px' : '20px'
        }))
    ]).create(bottomMenuElem)
  }
}
