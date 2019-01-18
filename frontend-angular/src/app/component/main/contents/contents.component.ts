import {HeaderMenuController} from '../header/header-menu-controller.service';
import {ElementRef, Injector, OnDestroy} from '@angular/core';
import {MainCommonAnimator} from '../main.common-animator.service';
import {AnimationType} from '../main.types';
import {ResolveKey} from '../../../app.types';
import {ActivatedRoute, Router, Scroll} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Location, ViewportScroller} from '@angular/common';
import {ContentsHistoryTacker} from './contents.history-tacker.service';
import {ContentsSection} from './contents.types';

/**
 * This class provides common feature of contentsComponent.
 * The common feature is consisted of three element.
 * First, contents should can control header menu {@link HeaderMenuController}.
 * Second, contents should can load resolver data which transferred by ResolveGuard.
 * Last, contents should be restored previous scroll position for user ux.
 */
export abstract class ContentsComponent implements OnDestroy {
  private static isAppliedBugFixViewportScroller = false;
  private readonly headerMenuController: HeaderMenuController;
  private readonly mainCommonAnimator: MainCommonAnimator;
  private readonly route: ActivatedRoute;

  protected constructor(injector: Injector) {
    this.headerMenuController = injector.get(HeaderMenuController);
    this.mainCommonAnimator = injector.get(MainCommonAnimator);
    this.route = injector.get(ActivatedRoute);

    const viewportScroller = injector.get(ViewportScroller);

    if ( !ContentsComponent.isAppliedBugFixViewportScroller ) {
      bugFixViewportScrollIfInIE(viewportScroller);
      ContentsComponent.isAppliedBugFixViewportScroller = true;
    }

    const commonHistoryTracker = injector.get(ContentsHistoryTacker);
    const router = injector.get(Router);
    const location = injector.get(Location);
    this.setHeaderBackButtonConfig(commonHistoryTracker, router, location);

    const hostElementRef = injector.get(ElementRef);
    this.restoreScrollPosition(hostElementRef, router, viewportScroller);
  }

  private setHeaderBackButtonConfig(commonHistoryTracker: ContentsHistoryTacker, router: Router, location: Location) {
    const isBackButtonVisible = this.getGoBackURLIfAbsentHistoryStack() !== undefined;
    this.headerMenuController.setBackButtonVisible(isBackButtonVisible);

    const isExistPreviousPage = commonHistoryTracker.isExistPreviousHistory();
    this.headerMenuController.setBackButtonClickListener(() => {
      if ( isExistPreviousPage ) {
        location.back();
      } else {
        router.navigateByUrl(this.getGoBackURLIfAbsentHistoryStack());
      }
    });
  }

  /* Because that restoring scroll position is completed after rendering views,
   * user can see afterimage of views.
   * Also since existing of async loaded element,
   * not precisely scroll located in AfterViewInit life-cycle
   * So we solve them by providing fade-in animation for hiding unnecessary things
   * after ending of event using by setTimeout */
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

  /*
   * When user direct connect to specific page, the location history stack is empty.
   * So, if user click to back button at header-menu the function isn't work properly.
   * To prevent this UX, we decided that each contents component need to declaring specific url
   * for go back page when history stack absent.
   * In conclusion, if there is no history stack, when user click to header's back button,
   * program will be navigating to url which declared by each contents component.
   */
  protected abstract getGoBackURLIfAbsentHistoryStack(): string | undefined;

  /**
   * The Contents Component provides navigating scroll position to element's offset when user menu item click.
   */
  protected setContentsSections(contentsSections: ContentsSection[]) {
    const menuNames = contentsSections.map(contentsSection => contentsSection.menuName);
    this.headerMenuController.setMenuNames(menuNames);

    this.headerMenuController.setOnMenuItemClickListener(menuName => {
      const targetElementRef = contentsSections
        .find(contentsSection => contentsSection.menuName === menuName)
        .elementRef;

      this.mainCommonAnimator.startAnimation(AnimationType.SCROLL_TO, targetElementRef);
    });
  }

  public getResolveData(resolveKey: ResolveKey) {
    return this.route.snapshot.data[resolveKey];
  }

  public ngOnDestroy(): void {
    this.headerMenuController.clearMenuNames();
  }
}

// FIXME (2019. 01. 16.)
//  ViewportScroller's getScrollPosition API is using scrollX, scrollY API.
//  that APIs not supported in IE, so it is obviously Angular API bug.
//  until this bug solved, this code have to be applied in IE.
function bugFixViewportScrollIfInIE (viewportScroller: ViewportScroller) {
  const isIE = navigator.userAgent.match(/Trident\/7\./);

  if ( !isIE ) {
    return ;
  }

  const prototype = viewportScroller as any;
  prototype['getScrollPosition'] = function() {
    if (this.supportScrollRestoration()) {
      return [this.window.pageXOffset, this.window.pageYOffset];
    } else {
      return [0, 0];
    }
  };
}
