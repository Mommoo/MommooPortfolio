import {animate, AnimationBuilder, style} from '@angular/animations';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn : 'root'
})
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

  private doHeightChangeAnimate(nativeListElement : HTMLElement, fromHeight : number, toHeight : number, callback? : () => void) : void {
    const animator = this.animationBuilder.build([
        style({height : fromHeight}),
        animate('300ms ease-in', style({
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
