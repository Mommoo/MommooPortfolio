import {ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HeaderMenuListEventService} from '../../../header/header-menu-list-event.service';
import {HeaderMenu} from '../../../header/types';
import {DomUtils} from '../../../../../mommoo-library/util/dom';
import {WindowScrollAnimator} from './window-scroll-animator';

@Component({
  selector: 'home-page',
  styles: [':host{display:block}'], //if not display block, this element can not proper find position-top
  template: '' +
    '<welcome-section></welcome-section>' +
    '<profile-section #profile></profile-section>' +
    '<about-section #about></about-section>' +
    '<simple-project-section #simpleProject></simple-project-section>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('profile', {read: ElementRef})
  private profileElementRef: ElementRef<HTMLElement>;

  @ViewChild('about', {read: ElementRef})
  private aboutElementRef: ElementRef<HTMLElement>;

  @ViewChild('simpleProject', {read: ElementRef})
  private simpleProjectElementRef: ElementRef<HTMLElement>;

  private headerMenuEventID: string;

  constructor(private eventService: HeaderMenuListEventService,
              private hostElementRef: ElementRef<HTMLElement>,
              private viewScrollAnimator: WindowScrollAnimator) {

  }

  public ngOnInit(): void {
    this.headerMenuEventID
      = this.eventService.subscribe(menu => this.handleMenuClick(menu));
  }

  private handleMenuClick(headerMenu: HeaderMenu): void {
    switch (headerMenu) {
      case HeaderMenu.PROFILE:
        this.scrollAnimate(this.profileElementRef);
        break;
      case HeaderMenu.ABOUT:
        this.scrollAnimate(this.aboutElementRef);
        break;
      case HeaderMenu.PROJECT:
        this.scrollAnimate(this.simpleProjectElementRef);
        break;
      case HeaderMenu.BLOG:
        HomePage.openNewPage('https://mommoo.tistory.com');
        break;
      case HeaderMenu.GITHUB:
        HomePage.openNewPage('https://github.com/Mommoo');
        break;
    }
  }

  private scrollAnimate(targetElementRef: ElementRef<HTMLElement>) {
    const fromTop = window.pageYOffset;
    const toTop = DomUtils.position(targetElementRef).top - DomUtils.position(this.hostElementRef).top;
    this.viewScrollAnimator.scrollTo(targetElementRef, fromTop, toTop);
  }

  private static openNewPage(newPageURL: string) {
    window.open(newPageURL, '_blank');
  }

  public ngOnDestroy(): void {
    this.eventService.unSubscribe(this.headerMenuEventID);
  }
}
