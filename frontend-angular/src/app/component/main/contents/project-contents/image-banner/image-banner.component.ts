import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BannerInfo} from './image-banner.types';

@Component({
  selector: 'image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBannerComponent {
  @Input()
  private bannerInfo: BannerInfo;

  public constructor(private sanitizer: DomSanitizer) { }

  public get backgroundImage() {
    const unTrustURL = this.bannerInfo.backgroundImageURL;
    return this.sanitizer.bypassSecurityTrustStyle(`url(${unTrustURL})`);
  }

  public get title() {
    return this.bannerInfo.title;
  }

  public get subTitle() {
    return this.bannerInfo.subTitle;
  }

  public get programType() {
    return this.bannerInfo.programType;
  }
}
