import {Component} from '@angular/core';
import {BasicSection} from '../../common/basic/basic-section.component';

@Component({
  selector: 'profile-section',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileSection extends BasicSection {
  constructor() {
    super();
  }

  protected getPageSubTitle(): string[] {
    return ['아래는 제 프로필 리스트 입니다.','논문은 PDF로 다운 받아서 볼 수 있습니다.'];
  }

  protected getPageTitle(): string {
    return 'PROFILE';
  }
}
