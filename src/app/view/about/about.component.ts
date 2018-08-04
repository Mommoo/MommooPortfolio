import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {SkillCard} from '../../ui/skill-card/skill-card';
import {ViewportDimension, WindowEventService} from '../../common/window-event.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  public maxColumnNum = 4;

  public languageSkillSet: Array<SkillCard> = [
    {
      baseSkillImgPaths: [],
      mainSkillImgPath: '/assets/images/java.png',
      mainSkillName: 'Java'
    },
    {
      baseSkillImgPaths: [],
      mainSkillImgPath: '/assets/images/html-css.png',
      mainSkillName: 'HTML-CSS'
    },
    {
      baseSkillImgPaths: ['/assets/images/html-css.png'],
      mainSkillImgPath: '/assets/images/sass.png',
      mainSkillName: 'sass'
    },
    {
      baseSkillImgPaths: [],
      mainSkillImgPath: '/assets/images/javascript.jpg',
      mainSkillName: 'javascript'
    },
    {
      baseSkillImgPaths: ['/assets/images/javascript.jpg'],
      mainSkillImgPath: '/assets/images/typescript.png',
      mainSkillName: 'typescript'
    },
    {
      baseSkillImgPaths: [],
      mainSkillImgPath: '/assets/images/c-shop.png',
      mainSkillName: 'C#'
    },
    {
      baseSkillImgPaths: [],
      mainSkillImgPath: '/assets/images/c-shop.png',
      mainSkillName: 'Python'
    },
    {
      baseSkillImgPaths: [],
      mainSkillImgPath: '/assets/images/c-plus-plus.png',
      mainSkillName: 'C++'
    }
  ];

  public frameworkSkillSet: Array<SkillCard> = [
    {
      baseSkillImgPaths: ['/assets/images/java.png'],
      mainSkillImgPath: '/assets/images/spring.png',
      mainSkillName: 'Spring'
    },
    {
      baseSkillImgPaths: ['/assets/images/java.png', '/assets/images/spring.png'],
      mainSkillImgPath: '/assets/images/spring-boot.png',
      mainSkillName: 'Spring-Boot'
    },
    {
      baseSkillImgPaths: ['/assets/images/c-shop.png'],
      mainSkillImgPath: '/assets/images/dot-net.png',
      mainSkillName: '.NET'
    },
    {
      baseSkillImgPaths: ['/assets/images/c-plus-plus.png'],
      mainSkillImgPath: '/assets/images/php.png',
      mainSkillName: 'PHP'
    },
    {
      baseSkillImgPaths: ['/assets/images/javascript.jpg'],
      mainSkillImgPath: '/assets/images/nodejs.png',
      mainSkillName: 'PHP'
    },
    {
      baseSkillImgPaths: ['/assets/images/javascript.jpg', '/assets/images/typescript.png', '/assets/images/nodejs.png'],
      mainSkillImgPath: '/assets/images/angular.png',
      mainSkillName: 'Angular'
    },
    {
      baseSkillImgPaths: ['/assets/images/javascript.jpg'],
      mainSkillImgPath: '/assets/images/j-query.png',
      mainSkillName: 'J-Query'
    },
    {
      baseSkillImgPaths: ['/assets/images/java.png'],
      mainSkillImgPath: '/assets/images/android.png',
      mainSkillName: 'android'
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
          break;

        case ViewportDimension.TABLET :
          this.maxColumnNum = 3;
          break;

        case ViewportDimension.DESKTOP :
          this.maxColumnNum = 4;
          break;
      }
      this.cdr.detectChanges();
    }, true);
  }
}
