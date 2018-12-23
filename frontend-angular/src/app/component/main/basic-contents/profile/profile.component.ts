import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {WebClientDataLoader} from '../../../../server/webclient/web-client-resource.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private _profile: {title: string, items: string[]};

  public constructor(private webClientDataLoader: WebClientDataLoader,
                     private changeDetection: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.setProfile().then(() => this.changeDetection.detectChanges());
  }

  private async setProfile() {
    const profile = await this.webClientDataLoader.introductionLoader.getProfileAsync();

    this._profile = {
      title: "인적사항",
      items: [
        profile.name,
        `${profile.age}살 (${profile.lastTwoOfBirthYear}년생)`,
        ...profile.degree
      ]
    };
  }

  public get profile() {
    return this._profile;
  }

  public get bannerDescriptions(): string[] {
    return ['아래는 제 프로필 리스트 입니다.'];
  }

  public get bannerTitle(): string {
    return 'PROFILE';
  }
}
