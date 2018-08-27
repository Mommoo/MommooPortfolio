import {ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from './view/header/header.component';
import {ProfileComponent} from './view/profile/profile.component';
import {AboutComponent} from './view/about/about.component';
import {PortfolioComponent} from './view/portfolio/portfolio.component';
import {MenuListItem} from './view/header/menu/menu-list/menu-list.item';
import {AnimationSetting} from './common/animationSetting';
import {ViewportDimension, WindowEventService} from './common/window-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
// export class AppComponent {
//
// }
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent)
  private headerComponent: HeaderComponent;

  @ViewChild('shadowHeader')
  private shadowHeaderElementRef: ElementRef;

  @ViewChild(ProfileComponent, {read: ElementRef})
  private profileElementRef: ElementRef;

  @ViewChild(AboutComponent, {read: ElementRef})
  private aboutElementRef: ElementRef;

  @ViewChild(PortfolioComponent, {read: ElementRef})
  private portfolioElementRef: ElementRef;

  public constructor(private windowEventService: WindowEventService) {
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {

        switch (viewportDimension) {
          case ViewportDimension.MOBILE :
          case ViewportDimension.TABLET :
            this.shadowHeaderElementRef.nativeElement.style.height = `${this.headerComponent.getHeaderHeight()}px`;
            console.log(`height : ${this.headerComponent.getHeaderHeight()}`);
            break;

          case ViewportDimension.DESKTOP :
            break;
        }
      }, true);
    },0);
  }

  public onMenuClick(menuItem: MenuListItem): void {
    const offsetY : number = !WindowEventService.isDesktopViewport() ? this.headerComponent.getHeaderHeight() : 0;
    switch (menuItem) {
      case MenuListItem.PROFILE :
        AppComponent.scrollToElement(this.profileElementRef, offsetY);
        break;

      case MenuListItem.ABOUT :
        AppComponent.scrollToElement(this.aboutElementRef, offsetY);
        break;

      case MenuListItem.PORTFOLIO :
        AppComponent.scrollToElement(this.portfolioElementRef, offsetY);
        break;

      case MenuListItem.BLOG :
        AppComponent.openNewWindow('https://mommoo.tistory.com');
        break;

      case MenuListItem.GITHUB :
        AppComponent.openNewWindow('https://github.com/mommoo');
        break;
    }
  }

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
    if ( this.image === '/assets/images/test.jpg' ) {
      this.image = '/assets/images/javascript.jpg';
    } else {
      this.image = '/assets/images/test.jpg';
    }
  }
}


