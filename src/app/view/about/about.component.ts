import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {ViewportDimension, WindowEventService} from '../../common/window-event.service';

interface CardProperty {
  name : string
  imagePath : string,
  hashTagMessages : Array<string>,
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  private static readonly IMAGE_ROOT_PATH = '/assets/images/';
  public maxColumnNum = 6;
  public cardTitleFontSize : string;

  public readonly cardProps : Array<CardProperty> = [
    {
      name : 'Java',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}java.png`,
      hashTagMessages : ['Java를 제일 잘함']
    },
    {
      name : 'HTML-CSS',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}html-css.png`,
      hashTagMessages : ['FlexBox 잘 다룸']
    },
    {
      name : 'SASS',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}sass.png`,
      hashTagMessages : ['변수 사용','문법 조금']
    },
    {
      name : 'JavaScript',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}javascript.jpg`,
      hashTagMessages : ['자바스크립트 2번째로 잘함', '표현에 신경']
    },
    {
      name : 'TypeScript',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}typescript.png`,
      hashTagMessages : ['최고 관심사', '앞으로 계속 사용']
    },
    {
      name : 'C#',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}c-shop.png`,
      hashTagMessages : ['개발 경험 몇번 있음']
    },
    {
      name : 'Python',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}python.png`,
      hashTagMessages : ['크롤링 프로젝트 할 때 한번 써봄']
    },
    {
      name : 'C++',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}c-plus-plus.png`,
      hashTagMessages : ['개발은 할 수 있음']
    },
    {
      name : 'Spring',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}spring.png`,
      hashTagMessages : ['개발 경험 있음']
    },
    {
      name : 'Spring-Boot',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}spring-boot.png`,
      hashTagMessages : ['삼성 외주 프로젝트', '관심 많음']
    },
    {
      name : '.NET',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}dot-net.png`,
      hashTagMessages : ['LINC 사업단 연계 외주']
    },
    {
      name : 'PHP',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}php.png`,
      hashTagMessages : ['빠르게 MY-SQL 연동 서버', '개인 서버 백앤드']
    },
    {
      name : 'NodeJS',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}nodejs.png`,
      hashTagMessages : ['express 서버']
    },
    {
      name : 'Angular',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}angular.png`,
      hashTagMessages : ['해당 포트폴리오 페이지에 사용', '관심 많음']
    },
    {
      name : 'J-Query',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}j-query.png`,
      hashTagMessages : ['경험이 제일 많음', '바닐라 자바스크립트 선호']
    },
    {
      name : 'Android',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}android.png`,
      hashTagMessages : ['개발 경험 다수', '커스텀 뷰', '자바로 개발']
    }
  ];

  constructor(private cdr: ChangeDetectorRef,
              private windowEventService: WindowEventService) {

  }

  ngAfterViewInit(): void {
    this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {
      switch (viewportDimension) {
        case ViewportDimension.MOBILE :
          this.maxColumnNum = 2;
          this.cardTitleFontSize = '4vmax';
          break;

        case ViewportDimension.TABLET :
          this.maxColumnNum = 4;
          this.cardTitleFontSize = '3vmax';
          break;

        case ViewportDimension.DESKTOP :
          this.maxColumnNum = 6;
          this.cardTitleFontSize = '2vmax';
          break;
      }
      this.cdr.detectChanges();
    }, true);
  }
}
