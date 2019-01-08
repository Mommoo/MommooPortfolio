import {KeyframeAnimator} from '../../../../../mommoo-library/handler/animation/keyframe/keyframe-animator';
import {ElementRef} from '@angular/core';
import {
  AnimationKeyframe,
  KeyframeAnimationConfig,
  KeyframeAnimationType
} from '../../../../../mommoo-library/handler/animation/keyframe/types';
import {DomUtils} from '../../../../../mommoo-library/util/dom';
import {AnimationKey, MenuButtonLineOffsetsTop} from '../header.types';

/**
 * This class provides that hamburger menu animation
 * and animation callback event used by KeyframeAnimator. {@link KeyframeAnimator}
 *
 * The KeyframeAnimator is created by {@link LineKeyframes} class.
 */
export class MenuButtonAnimator {
  private readonly keyframeAnimator;
  private isPending;

  public constructor(lineHeight: number, lineGutter: number) {
    const menuButtonLineOffsetsTop
      = MenuButtonAnimator.computeMenuButtonLineOffsetTop(lineHeight, lineGutter);
    this.keyframeAnimator
      = MenuButtonAnimator.createMenuButtonKeyframeAnimator(menuButtonLineOffsetsTop);
  }

  private static computeMenuButtonLineOffsetTop(lineHeight: number, lineGutter: number)
    : MenuButtonLineOffsetsTop {
    return {
      upperLineTop: 0,
      middleLineTop: lineHeight + lineGutter,
      lowerLineTop: (lineHeight + lineGutter) * 2
    };
  }

  private static createMenuButtonKeyframeAnimator(menuButtonLineOffsetsTop: MenuButtonLineOffsetsTop) {
    const keyframeAnimator = new KeyframeAnimator();
    const [normalAnimationKeyframes, reverseAnimationKeyframes]
      = LineKeyframes.computeKeyframes(menuButtonLineOffsetsTop);

    keyframeAnimator.addKeyframes(normalAnimationKeyframes);
    keyframeAnimator.addKeyframes(reverseAnimationKeyframes);
    return keyframeAnimator;
  }

  private static combineToAnimationKeys(
    elementRefs: ElementRef<HTMLElement>[], animationName: string[]): AnimationKey[] {

    return elementRefs.map((elementRef, index) => ({
      animationName: animationName[index],
      elementRef: elementRef
    }));
  }

  private registerDoneListener(animationKeys: AnimationKey[], doneListener: () => void) {
    const animationEndChecker
      = new Array(animationKeys.length).fill(false, 0, animationKeys.length);

    const animationCheckListener = (type, index) => {
      if (type === KeyframeAnimationType.ANIMATION_END) {
        animationEndChecker[index] = true;
      }

      const animationAllEnd = animationEndChecker.every(bool => bool);
      if (animationAllEnd) {
        doneListener();
        animationKeys
          .forEach(key => {
            this.keyframeAnimator
              .unSubscribeAnimationListener(key.animationName, key.elementRef.nativeElement);
          });
        this.isPending = false;
      }
    };

    /** In IE when occur reflow screen,
     * re-start animation although animation already end. *
     * so, to prevent that problem when animation event end,
     * element change to the style that applied by animation event
     */
    const preventIEReflowReAnimate = (key, type) => {
      if (type === KeyframeAnimationType.ANIMATION_END) {
        DomUtils.applyStyle(key.elementRef, {
          ...this.keyframeAnimator.getKeyframe(key.animationName).keyframe.to,
          animationName: ''
        });
      }
    };

    animationKeys.forEach((key, index) => {
      this.keyframeAnimator
        .subscribeAnimationListener(key.animationName, key.elementRef.nativeElement, type => {
          animationCheckListener(type, index);
          preventIEReflowReAnimate(key, type);
        });
    });
  }

  public startAnimation(type: 'normal' | 'reverse',
                        elementRefs: ElementRef<HTMLElement>[],
                        doneListener: () => void) {
    if (type === 'normal') {
      this.startAnimations(elementRefs, LineKeyframes.getNormalAnimationNames(), doneListener);
    } else {
      this.startAnimations(elementRefs, LineKeyframes.getReverseAnimationNames(), doneListener);
    }
  }

  public isAnimationPending() {
    return this.isPending;
  }

  private startAnimations(elementRefs: ElementRef<HTMLElement>[],
                          animationName: string[],
                          doneListener: () => void) {
    const animationKeys = MenuButtonAnimator.combineToAnimationKeys(elementRefs, animationName);
    this.registerDoneListener(animationKeys, doneListener);
    this.isPending = true;
    animationKeys
      .forEach(key => this.keyframeAnimator.startAnimation(key.animationName, key.elementRef));
  }
}

/**
 * This class decide that each menu line element's animations shape.
 *
 * The animation shape is normal animation or reverse animation.
 *
 * Following element animation shape example is normal animation,
 * the reverse animation is reverse to normal animation.
 *
 * The TopElement animation shape is rotating and moving to middle position animation.
 * The MiddleElement animation shape is simply fade animation.
 * The BottomElement animation shape is rotating and moving to middle position animation.
 */
class LineKeyframes {
  private static manufactureAnimationNames(menuButtonAnimationType: 'normal' | 'reverse') {
    return ['top', 'middle', 'bottom']
      .map(location => `mommoo-menu-button-${location}-line-${menuButtonAnimationType}-animation`);
  }

  private static computeNormalKeyframeValues(menuButtonLineOffsetsTop: MenuButtonLineOffsetsTop) {
    const normalTopKeyframeValue = [
      {
        transform: 'rotate(0deg)',
        top: `${menuButtonLineOffsetsTop.upperLineTop}px`
      },
      {
        transform: 'rotate(-405deg)',
        top: `${menuButtonLineOffsetsTop.middleLineTop}px`
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
        top: `${menuButtonLineOffsetsTop.lowerLineTop}px`
      },
      {
        transform: 'rotate(405deg)',
        top: `${menuButtonLineOffsetsTop.middleLineTop}px`
      }
    ];
    return [
      normalTopKeyframeValue,
      normalMiddleKeyframeValue,
      normalBottomKeyframeValue
    ];
  }

  public static getNormalAnimationNames() {
    return this.manufactureAnimationNames('normal');
  }

  public static getReverseAnimationNames() {
    return this.manufactureAnimationNames('reverse');
  }

  public static computeKeyframes(menuButtonLineOffsetsTop: MenuButtonLineOffsetsTop)
    : [AnimationKeyframe[], AnimationKeyframe[]] {
    const normalKeyframeValues = this.computeNormalKeyframeValues(menuButtonLineOffsetsTop);
    const normalAnimationConfig: KeyframeAnimationConfig = {
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
}
