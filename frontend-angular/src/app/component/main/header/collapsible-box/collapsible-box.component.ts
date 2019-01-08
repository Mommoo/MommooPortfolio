import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import {animate, AnimationBuilder, style} from '@angular/animations';
import {DomUtils} from '../../../../../mommoo-library/util/dom';

/**
 * This class is provides drop-down animations.
 * ( expand to lower direction or collapse to upper direction )
 */
@Component({
  selector: 'collapsible-box',
  templateUrl: './collapsible-box.component.html',
  styleUrls: ['./collapsible-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleBoxComponent {
  public visibility = false;

  public constructor(private hostElementRef: ElementRef<HTMLElement>,
                     private animationBuilder: AnimationBuilder,
                     private changeDetector: ChangeDetectorRef) {

  }

  public start(executeType: 'expand' | 'collapse', animate: boolean) {
    if ( executeType === 'expand' ) {
      this.startExpand(animate);
    } else {
      this.startCollapse(animate);
    }
  }

  public startExpand(animate: boolean) {
    this.setVisibility(true);
    if ( animate ) {
      const fromHeight = 0;
      const toHeight = DomUtils.position(this.hostElementRef).height;
      this.startHeightChangeAnimation(fromHeight, toHeight);
    }
  }

  public startCollapse(animate: boolean) {
    if ( animate ) {
      const fromHeight = DomUtils.position(this.hostElementRef).height;
      const toHeight = 0;
      this.startHeightChangeAnimation(fromHeight, toHeight, () => this.setVisibility(false));
    } else {
      this.setVisibility(false);
    }
  }

  private setVisibility(visible: boolean) {
    this.visibility = visible;
    this.changeDetector.detectChanges();
  }

  private startHeightChangeAnimation(fromHeight: number, toHeight: number, callback: () => void = () => {}): void {
    const animator = this.animationBuilder.build([
      style({height : fromHeight}),
      animate('300ms ease-in', style({
        height : toHeight
      }))
    ]).create(this.hostElementRef.nativeElement);

    animator.onDone(() => {
      callback();
      animator.destroy();
    });

    animator.play();
  }
}
