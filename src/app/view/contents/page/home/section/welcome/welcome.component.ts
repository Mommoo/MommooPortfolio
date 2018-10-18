import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BasicSectionComponent} from '../../common/basic/basic-section.component';

@Component({
  selector: 'view-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent extends BasicSectionComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  protected getPageSubTitle(): string[] {
    return ['편리하고 멋진 프로그램을 만들고 싶은 개발자 최경수 입니다.',
      '저는 개발자 Mommoo로 활동하고 있습니다.',
      '프로그램 개발을 즐기며, 여러 개발 경험을 보유하고 있습니다.',
      '좋은 인연이 되어, 함께 할 수 있는 기회가 되었으면 좋겠습니다.',
      '방문해주셔서 감사합니다.'];
  }

  protected getPageTitle(): string {
    return "WELCOME";
  }
}
