import {KeyframeAnimator} from '../../../../../mommoo-library/handler/animation/keyframe/keyframe-animator';
import {ElementRef, Injectable} from '@angular/core';
import {AnimationKeyframe, KeyframeAnimationConfig, KeyframeAnimationType} from '../../../../../mommoo-library/handler/animation/types';

@Injectable()
export class MenuButtonAnimator {
  private static readonly commonConfig = MenuButtonAnimator.createCommonConfig();
  private keyframeAnimator = MenuButtonAnimator.createMenuButtonKeyframeAnimator();
  private isPending;

  private static createCommonConfig(): KeyframeAnimationConfig {
    return {
      name: '',
      fillMode: 'forwards'
    };
  }

  private static createMenuButtonKeyframeAnimator() {
    const keyframeAnimator = new KeyframeAnimator();
    const [normalAnimationKeyframes, reverseAnimationKeyframes] = LineKeyframes.computeKeyframes();
    keyframeAnimator.addKeyframes(normalAnimationKeyframes);
    keyframeAnimator.addKeyframes(reverseAnimationKeyframes);
    return keyframeAnimator;
  }

  private registerDoneListener(animationKeys: AnimationKey[], doneListener: ()=>void) {
    const removeAnimationListenerAll = ()=> {
      animationKeys.forEach(key=> {
        this.keyframeAnimator.unSubscribeAnimationListener(key.animationName, key.elementRef.nativeElement);
      });
    };

    const animationEndChecker = new Array(animationKeys.length).fill(false, 0, animationKeys.length);

    const animationCheckListener = (type, index)=>{
      if ( type === KeyframeAnimationType.ANIMATION_END ) {
        animationEndChecker[index] = true;
      }
      const animationAllEnd = animationEndChecker.every(bool=> bool);
      if (animationAllEnd) {
        doneListener();
        removeAnimationListenerAll();
        this.isPending = false;
      }
    };

    animationKeys.forEach((key, index)=> {
      this.keyframeAnimator.subscribeAnimationListener(key.animationName, key.elementRef.nativeElement, type=> animationCheckListener(type, index));
    });
  }

  public startNormalAnimation(elementRefs: ElementRef<HTMLElement>[], doneListener: ()=>void) {
    this.startAnimations(elementRefs, LineKeyframes.getNormalAnimationNames(), 'ease-in', doneListener);
  }

  public startReverseAnimation(elementRefs: ElementRef<HTMLElement>[], doneListener: ()=>void) {
    this.startAnimations(elementRefs, LineKeyframes.getReverseAnimationNames(), 'ease-out', doneListener);
  }

  public isAnimationPending() {
    return this.isPending;
  }

  private static createAnimationKeys(elementRefs: ElementRef<HTMLElement>[], animationName:string[]): AnimationKey[] {
    return elementRefs.map((elementRef, index)=>({
      animationName: animationName[index],
      elementRef: elementRef
    }))
  }

  private startAnimations(elementRefs: ElementRef<HTMLElement>[], animationName:string[], easing: 'ease-in' | 'ease-out', doneListener: ()=>void) {
    const animationKeys = MenuButtonAnimator.createAnimationKeys(elementRefs, animationName);
    this.registerDoneListener(animationKeys, doneListener);
    this.isPending = true;
    animationKeys.forEach(key=> this.keyframeAnimator.startAnimation(key.elementRef, {
        ...MenuButtonAnimator.commonConfig,
        name: key.animationName,
        timingFunction: easing
      }));
  }
}

class LineKeyframes {
  private static readonly topLineNormalAnimationName = 'mommoo-menu-button-top-line-normal-animator';
  private static readonly middleLineNormalAnimationName = 'mommoo-menu-button-middle-line-normal-animator';
  private static readonly bottomLineNormalAnimationName = 'mommoo-menu-button-bottom-line-normal-animator';

  private static readonly topLineReverseAnimationName = 'mommoo-menu-button-top-line-reverse-animator';
  private static readonly middleLineReverseAnimationName = 'mommoo-menu-button-middle-line-reverse-animator';
  private static readonly bottomLineReverseAnimationName = 'mommoo-menu-button-bottom-line-reverse-animator';

  public static getNormalAnimationNames() {
    return [
      LineKeyframes.topLineNormalAnimationName,
      LineKeyframes.middleLineNormalAnimationName,
      LineKeyframes.bottomLineNormalAnimationName
    ];
  }

  public static getReverseAnimationNames() {
    return [
      LineKeyframes.topLineReverseAnimationName,
      LineKeyframes.middleLineReverseAnimationName,
      LineKeyframes.bottomLineReverseAnimationName
    ];
  }

  public static computeKeyframes(): [AnimationKeyframe[], AnimationKeyframe[]] {
    const normalKeyframeValues = this.computeNormalKeyframeValues();

    const normalAnimationKeyframes: AnimationKeyframe[] =
      LineKeyframes.getNormalAnimationNames()
        .map((animationName, index) => ({
          animationName: animationName,
          keyframe: {
            from: normalKeyframeValues[index][0],
            to: normalKeyframeValues[index][1]
          }
        }));

    const reverseAnimationKeyframes: AnimationKeyframe[] =
      LineKeyframes.getReverseAnimationNames()
        .map((animationName, index) => ({
          animationName: animationName,
          keyframe: {
            from: normalKeyframeValues[index][1],
            to: normalKeyframeValues[index][0]
          }
        }));

    return [normalAnimationKeyframes, reverseAnimationKeyframes];
  }

  private static computeNormalKeyframeValues() {
    const normalTopKeyframeValue = [
      {
        transform: 'rotate(0deg)',
        top: '0'
      },
      {
        transform: 'rotate(-405deg)',
        top: '10px'
      }
    ];

    const normalMiddleKeyframeValue = [
      {
        opacity: 1
      },
      {
        opacity: 0
      }
    ];

    const normalBottomKeyframeValue = [
      {
        transform: 'rotate(0deg)',
        top: '20px'
      },
      {
        transform: 'rotate(405deg)',
        top: '10px'
      }
    ];
    return [
      normalTopKeyframeValue,
      normalMiddleKeyframeValue,
      normalBottomKeyframeValue
    ];
  }
}

interface AnimationKey {
  animationName: string,
  elementRef: ElementRef<HTMLElement>
}
