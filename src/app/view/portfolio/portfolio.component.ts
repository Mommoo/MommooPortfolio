import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CommonDataService} from '../../common/common-data.service';

@Component({
  selector: 'view-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {

  themeColor : string;

  public projectCardDatas : Array<ProjectCardData> = [
    {
      title : 'FlatSwing',
      imagePath : '',
      summary : '해당 프로젝트는 자바 시스템 UI인 Swing을 보강하기 위한 라이브러리를 제작하였다.\n' +
        '자바 Swing의 단점 중 하나인 UI디자인을 플랫 디자인으로 제작하였으며, 스윙이 제공하기 어려운 API 부분을 스윙 로우 단계까지 분석하여 필요한 API를 직접 구현하였다. 공개 라이브러리를 생각한 공개 API의 디자인을 생각하여, 클래스와 메서드를 설계 제작했다.',
      description : '- 공개API를 제작,배포 유지보수 하기 위한 캡슐화\n' +
        '- 지속적인 리팩토링으로 코드 품질 개선을 높이며, 디자인패턴, 객체지향등을 적용하여 공부\n' +
        '- AWT Painting API를 써가며 프론트앤드 기술에 필수적인 Canvas Paint 이론을 공부',
      skillSets : ['Swing', 'AWT Painting', 'Canvas Animation'],
      onClickEvent : () => {
        console.log('foo');
      }
    }
  ];

  constructor(commonDataService : CommonDataService, private cdr : ChangeDetectorRef) {
    this.themeColor = commonDataService.getThemeColor();
  }
}

export interface ProjectCardData {
  title : string,
  imagePath : string,
  skillSets : Array<string>,
  summary : string,
  description : string,
  onClickEvent : () => any;
}
