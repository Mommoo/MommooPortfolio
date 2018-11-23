import {Component, OnInit, ChangeDetectionStrategy, Input, AfterViewChecked} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'fixed-image-header-section',
  templateUrl: './fixed-image-header.component.html',
  styleUrls: ['./fixed-image-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedImageHeaderSection implements OnInit,AfterViewChecked {
  @Input()
  private imagePath: string = '../../../../../../../assets/images/portfolio/kakiday.png';

  public get securityImageURL(){
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.imagePath})`);
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    console.log('afterViewChecked!!');
  }
}
