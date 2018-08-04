import {animate, AnimationBuilder, style} from "@angular/animations";
import {AnimationSetting} from "../../../../common/animationSetting";
import {ElementRef} from '@angular/core';

export class MenuListAnimator {


  public constructor(private animationBuilder : AnimationBuilder) {

  }

  public animateShowMenuList(nativeListElement : HTMLElement) : void {
    const fromHeight : number = 0;
    const toHeight   : number = nativeListElement.offsetHeight;
    this.doHeightChangeAnimate(nativeListElement, fromHeight, toHeight);
  }

  public animateHideMenuList(nativeListElement : HTMLElement, onHideDoneListener : ()=>void) : void {
    const fromHeight : number = nativeListElement.offsetHeight;
    const toHeight   : number = 0;
    this.doHeightChangeAnimate(nativeListElement, fromHeight, toHeight, onHideDoneListener);
  }

  //TODO 아니... 애니메이션 끝난후 destroy를 안해주면 css가 애니메이션 마지막 설정으로 고정 되는거 같음.. 근데 이상한건
  //TODO 애니메이션 빌더를 쓰면 css변경사항이 브라우저에서 캐치 안됨.. ??
  private doHeightChangeAnimate(nativeListElement : HTMLElement, fromHeight : number, toHeight : number, callback? : () => void) : void {
    const animator = this.animationBuilder.build([
        style({height : fromHeight}),
        animate(AnimationSetting.EASE_IN_TIMING, style({
          height : toHeight
        }))
      ]).create(nativeListElement);

    animator.onDone(()=>{
      if ( callback ) {callback();}
      animator.destroy();
    });

    animator.play();
  }
}
