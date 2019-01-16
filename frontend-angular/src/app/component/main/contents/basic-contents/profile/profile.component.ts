import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {WebClient} from '../../../../../server/webclient/web-client-types';
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

  public get bannerDescriptions(): string[] {
    return ['아래는 제 프로필 리스트 입니다.'];
  }

  public get bannerTitle(): string {
    return 'PROFILE';
  }
}
