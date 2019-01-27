import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {BannerInfo} from './image-banner.types';
import {WindowSizeEventHandler} from '../../../../../../mommoo-library/handler/window/size/window-size-handler';

@Component({
  selector: 'image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBannerComponent implements AfterViewInit, OnDestroy {
  @Input()
  private bannerInfo: BannerInfo;

  private hostElementHeight: number;
  private isHidden = false;
  private heightChangeEventID: string;

  public constructor(private sanitizer: DomSanitizer,
                     private hostElementRef: ElementRef<HTMLElement>,
                     private changeDetection: ChangeDetectorRef) { }

  @HostListener('window:scroll')
  private onScrollEvent() {
    this.computeSetBannerHide();
  }

  /* Because this banner position is fixed, this can overlap another ui.
  * so when this scroll over banner height, hide this banner for preventing upper issue*/
  private computeSetBannerHide() {
    if (!this.isHidden && pageYOffset >= this.hostElementHeight) {
      this.hostElementRef.nativeElement.style.opacity = '0';
      this.isHidden = true;
      this.changeDetection.detectChanges();
      return;
    }

    if (this.isHidden && pageYOffset < this.hostElementHeight) {
      this.hostElementRef.nativeElement.style.opacity = '1';
      this.isHidden = false;
      this.changeDetection.detectChanges();
      return;
    }
  }

  public ngAfterViewInit(): void {
    this.heightChangeEventID = WindowSizeEventHandler.addResizingEvent(() => {
      this.hostElementHeight = this.hostElementRef.nativeElement.offsetHeight;
      this.computeSetBannerHide();
    }, true);
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvent(this.heightChangeEventID);
  }

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
