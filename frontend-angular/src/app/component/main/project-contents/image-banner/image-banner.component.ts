import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'image-banner',
  templateUrl: './image-banner.component.html',
  styleUrls: ['./image-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageBannerComponent implements OnInit {
  @Input()
  public backgroundImageURL;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  public get backgroundImage() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.backgroundImageURL})`);
  }

}
