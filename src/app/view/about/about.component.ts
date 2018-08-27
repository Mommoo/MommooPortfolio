import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {WindowEventService} from '../../common/window-event.service';
import {CommonDataService} from '../../common/common-data.service';

interface CardProperty {
  name : string
  imagePath : string,
  hashTagMessages : Array<string>,
}

@Component({
  selector: 'view-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  private static readonly IMAGE_ROOT_PATH = '/assets/images/';
  public maxColumnNum = 6;
  public gutterSize = 20;
  public cardContentFontSize : string;
  public themeColor : string;

  public readonly cardProps : Array<CardProperty> = [
    {
      name : 'Java',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}java.png`,
      hashTagMessages : ['Java를 제일 잘함']
    },
    {
      name : 'HTML-CSS',
      imagePath : `${AboutComponent.IMAGE_ROOT_PATH}html-css.png`,
      hashTagMessages : ['FlexBox 잘 다룸' ,'반응형 웹']
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
              private windowEventService: WindowEventService,
              private commonDataService : CommonDataService) {
    this.themeColor = commonDataService.getThemeColor();
  }

  ngAfterViewInit(): void {
    const checkWindowWidthRange = ()=> {
      const innerWidth = window.innerWidth;
      if ( innerWidth > 1400) {
        return 'x-large';
      } else if ( 1250 < innerWidth && innerWidth <= 1400 ) {
        return 'large';
      } else if ( 1025 < innerWidth && innerWidth <= 1250 ){
        return 'x-medium';
      } else if ( 768 < innerWidth && innerWidth <= 1025) {
        return 'medium';
      } else if ( innerWidth <= 768 ) {
        return 'small';
      }
    };

    const setProperty = (colNum : number, contentFontSize : string, gutterSize : number) => {
      this.maxColumnNum = colNum;
      this.cardContentFontSize = contentFontSize;
      this.gutterSize = gutterSize;
    };

    let windowWidthRange;

    this.windowEventService.addViewportResizeListener(() => {
      if ( windowWidthRange === checkWindowWidthRange() ) {
        return;
      }

      windowWidthRange = checkWindowWidthRange();

      switch ( windowWidthRange ) {
        case 'x-large':
          setProperty(6, '1vmax', 12);
          break;
        case 'large' :
          setProperty(5, '1.2max', 10);
          break;
        case 'x-medium' :
          setProperty(4, '1.4max', 8);
          break;
        case 'medium' :
          setProperty(4, '1.5max', 6);
          break;
        case 'small' :
          setProperty(2, '2vmax', 4);
          break;
      }
      
      this.cdr.detectChanges();
    }, true);
  }
}
