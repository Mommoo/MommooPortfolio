import {KeyframeAnimator} from '../../../../mommoo-library/handler/animation/keyframe/keyframe-animator';
import {ElementRef, Injectable} from '@angular/core';
import {
  AnimationKeyframe,
  KeyframeAnimationConfig,
  KeyframeAnimationType
} from '../../../../mommoo-library/handler/animation/keyframe/types';
import {DomUtils} from '../../../../mommoo-library/util/dom';

@Injectable()
export class MenuButtonAnimator {
  private keyframeAnimator = MenuButtonAnimator.createMenuButtonKeyframeAnimator();
  private isPending;

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

    /** In IE when occur reflow screen,
     * re-start animation although animation already end. *
     * so, to prevent that problem when animation event end,
     * element change to the style that applied by animation event
     */
    const preventIEReflowReAnimate = (key, type)=>{
      if ( type === KeyframeAnimationType.ANIMATION_END ) {
        DomUtils.applyStyle(key.elementRef, {
          ...this.keyframeAnimator.getKeyframe(key.animationName).keyframe.to,
          animationName: ''
        });
      }
    };

    animationKeys.forEach((key, index)=> {
      this.keyframeAnimator.subscribeAnimationListener(key.animationName, key.elementRef.nativeElement, type=> {
        animationCheckListener(type, index);
        preventIEReflowReAnimate(key, type);
      });
    });
  }

  public startAnimation(type: 'normal' | 'reverse', elementRefs: ElementRef<HTMLElement>[], doneListener: ()=>void){
    if ( type === 'normal' ) {
      this.startAnimations(elementRefs, LineKeyframes.getNormalAnimationNames(), doneListener);
    } else {
      this.startAnimations(elementRefs, LineKeyframes.getReverseAnimationNames(), doneListener);
    }
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

  private startAnimations(elementRefs: ElementRef<HTMLElement>[], animationName:string[], doneListener: ()=>void) {
    const animationKeys = MenuButtonAnimator.createAnimationKeys(elementRefs, animationName);
    this.registerDoneListener(animationKeys, doneListener);
    this.isPending = true;
    animationKeys.forEach(key=> this.keyframeAnimator.startAnimation(key.animationName, key.elementRef));
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
    const normalAnimationConfig: KeyframeAnimationConfig= {
      timingFunction: 'ease-in',
      fillMode: 'forwards'
    };
    const reverseAnimationConfig: KeyframeAnimationConfig = {
      timingFunction: 'ease-out',
      fillMode: 'forwards'
    };

    const normalAnimationKeyframes: AnimationKeyframe[] =
      LineKeyframes.getNormalAnimationNames()
        .map((animationName, index) => ({
          animationName: animationName,
          keyframe: {
            from: normalKeyframeValues[index][0],
            to: normalKeyframeValues[index][1]
          },
          commonConfig: {...normalAnimationConfig}
        }));

    const reverseAnimationKeyframes: AnimationKeyframe[] =
      LineKeyframes.getReverseAnimationNames()
        .map((animationName, index) => ({
          animationName: animationName,
          keyframe: {
            from: normalKeyframeValues[index][1],
            to: normalKeyframeValues[index][0]
          },
          commonConfig: {...reverseAnimationConfig}
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
        opacity: '1'
      },
      {
        opacity: '0'
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
