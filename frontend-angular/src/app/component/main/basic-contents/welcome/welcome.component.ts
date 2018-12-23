import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WebClientDataLoader} from '../../../../server/webclient/web-client-resource.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  private _isImagePathLoaded = false;
  private _properties: {pdf};

  public constructor(private webClientDataLoader: WebClientDataLoader,
                     private changeDetector: ChangeDetectorRef,
                     private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.loadImagePaths()
      .then(() => this.changeDetector.detectChanges());
  }

  public isImagePathLoaded() {
    return this._isImagePathLoaded;
  }

  public getBannerDescriptions(): string[] {
    return ['편리하고 멋진 프로그램을 만들고 싶은 개발자 최경수 입니다.',
      '저는 개발자 Mommoo로 활동하고 있습니다.',
      '프로그램 개발을 즐기며, 여러 개발 경험을 보유하고 있습니다.',
      '좋은 인연이 되어, 함께 할 수 있는 기회가 되었으면 좋겠습니다.',
      '방문해주셔서 감사합니다.'];
  }

  public getBannerTitle(): string {
    return 'WELCOME';
  }

  public get properties() {
    return this._properties;
  }

  private securityImagePath(imagePath: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  }

  private async loadImagePaths() {
    const imageFinder: Map<string, string>
      = await this.webClientDataLoader
      .imageLoader
      .getFindImagePaths('pdf');

    this._properties = {
      pdf: this.securityImagePath(imageFinder.get('pdf'))
    };

    Object.freeze(this._properties);

    this._isImagePathLoaded = true;
  }

}
