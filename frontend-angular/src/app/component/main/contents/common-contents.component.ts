import {HeaderMenuController} from '../header/header-menu-controller.service';
import {ElementRef, Injector, OnDestroy} from '@angular/core';
import {MainCommonAnimator} from '../main.common-animator.service';
import {AnimationType} from '../main.types';
import {ResolveKey} from '../../../app.types';
import {ActivatedRoute, Router, Scroll} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {ViewportScroller} from '@angular/common';

/**
 * This class provides common feature of contentsComponent.
 * The common feature is consisted of three element.
 * First, contents should can control header menu {@link HeaderMenuController}.
 * Second, contents should can load resolver data which transferred by ResolveGuard.
 * Last, contents should be restored previous scroll position for user ux.
 */
export abstract class CommonContentsComponent implements OnDestroy {
  private readonly headerMenuController: HeaderMenuController;
  private readonly mainCommonAnimator: MainCommonAnimator;
  private readonly route: ActivatedRoute;

  protected constructor(injector: Injector) {
    this.headerMenuController = injector.get(HeaderMenuController);
    this.mainCommonAnimator = injector.get(MainCommonAnimator);
    this.route = injector.get(ActivatedRoute);

    const hostElementRef = injector.get(ElementRef);
    const router = injector.get(Router);
    const viewportScroller = injector.get(ViewportScroller);

    this.initializeHeaderMenu(this.headerMenuController);
    this.restoreScrollPosition(hostElementRef, router, viewportScroller);
  }

  /* Because that restoring scroll position is completed after rendering views,
   * user can see afterimage of views.
   * So we preventing it as providing fade-in animation  */
  private restoreScrollPosition(hostElementRef: ElementRef<HTMLElement>,
                                router: Router,
                                viewportScroller: ViewportScroller) {

    hostElementRef.nativeElement.style.opacity = '0';

    const routerScrollEvent$ = router.events.pipe(
      filter(event => event instanceof Scroll),
      map(event => (event as Scroll).position),
    );

    const subscription = routerScrollEvent$.subscribe(position => {
      setTimeout(() => {
        if (position) {
          viewportScroller.scrollToPosition(position);
        }
        this.mainCommonAnimator.startAnimation(AnimationType.FADE_IN, hostElementRef);
      });
      subscription.unsubscribe();
    });
  }

  private initializeHeaderMenu(headerMenuController: HeaderMenuController) {
    headerMenuController.setOnMenuItemClickListener(menuName => this.onMenuItemClickListener(menuName));
    headerMenuController.setBackButtonVisible(this.isBackButtonVisible());
  }

  protected abstract onMenuItemClickListener(menuName: string);

  protected abstract isBackButtonVisible(): boolean;

  protected setMenuNames(menuNames: string[]) {
    this.headerMenuController.setMenuNames(menuNames);
  }

  public scrollAt(elementRef: ElementRef) {
    this.mainCommonAnimator.startAnimation(AnimationType.SCROLL_AT, elementRef);
  }

  public getResolveData(resolveKey: ResolveKey) {
    return this.route.snapshot.data[resolveKey];
  }

  public ngOnDestroy(): void {
    this.headerMenuController.clearMenuNames();
  }
}
