import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {AppResourceFinder} from '../../../../../app.types';
import {FileResourceType, ImageResourceType} from '../../../../../server/resource/resource.types';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {
  @Input()
  private appResourceFinder: AppResourceFinder;

  public constructor(private sanitizer: DomSanitizer) {

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

  public get PDFImagePath() {
    const imageResourcePath = this.appResourceFinder.icon.get(ImageResourceType.PDF);

    return this.sanitizer.bypassSecurityTrustResourceUrl(imageResourcePath);
  }

  public viewPDFPortfolio() {
    const pdfPortfolioFilePath
      = this.appResourceFinder.file.get(FileResourceType.MOMMOO_PORTFOLIO);
    window.open(pdfPortfolioFilePath, "_blank");
  }
}
