import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnimationSetting} from './common/animationSetting';
import {ViewportDimension, WindowEventService} from './common/window-event.service';

/**
 * naviationHeaderArea는 fixedHeader는 position fix 성질을 가진다.
 * fixedHeader가 부모에게 크기 정보를 주지 못하여, navigationHeaderArea는 의도한 뷰 템플릿 구조를 유지하기 어렵다.
 * 따라서, 페이지 레이아웃의 fixedHeader크기에 맞게 navigationHeaderArea에게 필요한 높이 값을 설정해야 한다.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('navigationHeaderArea')
  private navigationHeaderAreaElementRef: ElementRef;

  @ViewChild('fixedHeaderWrapper')
  private fixedHeaderWrapper: ElementRef;

  public constructor(private windowEventService: WindowEventService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {
      switch (viewportDimension) {
        case ViewportDimension.MOBILE :
        case ViewportDimension.TABLET :
          this.windowEventService.addViewportResizeListener('trackingHeader', ()=> {
            this.navigationHeaderAreaElementRef.nativeElement.style.height = `${this.fixedHeaderWrapper.nativeElement.offsetHeight}px`;
          }, true);
          break;

        case ViewportDimension.DESKTOP :
          this.windowEventService.removeEvent('trackingHeader');
          break;
      }
    }, true);
  }

  // public onMenuClick(menuItem: MenuListItem): void {
  //   //this.headerComponent.getHeaderHeight()
  //   const offsetY : number = !WindowEventService.isDesktopViewport() ? 0: 0;
  //   switch (menuItem) {
  //     case MenuListItem.PROFILE :
  //       AppComponent.scrollToElement(this.profileElementRef, offsetY);
  //       break;
  //
  //     case MenuListItem.ABOUT :
  //       AppComponent.scrollToElement(this.aboutElementRef, offsetY);
  //       break;
  //
  //     case MenuListItem.PORTFOLIO :
  //       AppComponent.scrollToElement(this.portfolioElementRef, offsetY);
  //       break;
  //
  //     case MenuListItem.BLOG :
  //       AppComponent.openNewWindow('https://mommoo.tistory.com');
  //       break;
  //
  //     case MenuListItem.GITHUB :
  //       AppComponent.openNewWindow('https://github.com/mommoo');
  //       break;
  //   }
  // }

  //TODO 애니메이션 객체 만들기..!
  //TODO 스크롤 가는거 다시 만들기 ㅠㅠ...
  private static scrollToElement(elementRef: ElementRef, offset: number) {
    const startY: number = window.pageYOffset;
    const destY: number = elementRef.nativeElement.offsetTop - offset;
    const duration: number = AnimationSetting.DURATION;
    let spentTime: number = 0;
    let previousTime: number = 0;

    const animationFunction = time => {
      if (previousTime != 0) {
        spentTime += time - previousTime;
      }
      previousTime = time;

      let percent = Math.min(spentTime / duration, 1);
      percent = AppComponent.easeInExpo(percent);

      const currentMove = (destY - startY) * percent;

      window.scroll(0, startY + currentMove);

      if (spentTime < duration) {
        window.requestAnimationFrame(animationFunction);
      }
    };

    window.requestAnimationFrame(animationFunction);
  }

  private static openNewWindow(URL: string): void {
    window.open(URL, '_blank');
  }

  private static easeInOutQuint(percent: number): number {
    return percent < 0.5 ? 16 * percent * percent * percent * percent * percent : 1 + 16 * (--percent) * percent * percent * percent * percent;
  }

  private static easeInExpo(percent: number): number {
    return (Math.pow(2, 8 * percent) - 1) / 255;
  }

  public image = '/assets/images/test.jpg';

  public test() {
    if (this.image === '/assets/images/test.jpg') {
      this.image = '/assets/images/javascript.jpg';
    } else {
      this.image = '/assets/images/test.jpg';
    }
  }
}


