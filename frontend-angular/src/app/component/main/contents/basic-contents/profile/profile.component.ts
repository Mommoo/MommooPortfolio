import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {WebClient} from '../../../../../server/webclient/web-client-types';
import {MommooPaper} from '../../../../../server/resource/resource.types';
import Profile = WebClient.Profile;

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  @Input('profile')
  private _profile: Profile;

  @Input('papers')
  private _papers: MommooPaper[];

  public get profile() {
    return {
      title: '인적사항',
      items: [
        this._profile.name,
        `${this._profile.age}살 (${this._profile.lastTwoOfBirthYear}년생)`,
        ...this._profile.degree
      ]
    };
  }

  public get papers() {
    return {
      title: '논문 리스트',
      items: this._papers
    };
  }

  public get bannerDescriptions(): string[] {
    return [
      '아래는 제 프로필 정보 입니다.',
      '저의 학위 정보와 석사 기간 동안 작성한 논문 리스트를 제공합니다.',
      '논문 항목을 누르시면 바로 읽어 보실 수 있습니다.'
    ];
  }

  public get bannerTitle(): string {
    return 'PROFILE';
  }
}
