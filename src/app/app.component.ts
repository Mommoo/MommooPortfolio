import {AfterContentInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {StyleUtils} from './ui/common/style/StyleUtils';
import {ViewportDimension, WindowEventService} from './common/window-event.service';

/**
 * naviationHeaderArea는 fixedHeader는 position fix 성질을 가진다.
 * fixedHeader가 부모에게 크기 정보를 주지 못하여, navigationHeaderArea는 의도한 뷰 템플릿 구조를 유지하기 어렵다.
 * 따라서, 페이지 레이아웃의 fixedHeader크기에 맞게 navigationHeaderArea에게 필요한 높이 값을 설정해야 한다.
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterContentInit {
  @ViewChild('headerArea')
  private headerAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('fixedHeaderWrapper')
  private fixedHeaderWrapper: ElementRef<HTMLElement>;

  @ViewChild('contentsArea')
  private contentsAreaElementRef : ElementRef<HTMLElement>;

  @ViewChild('footerArea')
  private footerAreaElementRef : ElementRef<HTMLElement>;

  constructor(private windowEventService : WindowEventService) {}

  ngAfterContentInit(): void {
    this.attachFakeHeaderForBlockStructure();
    this.registerChangeTemplateEventForFooter();
  }

  /** fixedHeader가 부모 영역을 벗어나기 때문에,
   * Header를 복사한 후 fixed-header 성질을 지우고 부모창에 붙여 block 구조만 살린다. */
  private attachFakeHeaderForBlockStructure() {
    const clonedHeader = this.fixedHeaderWrapper.nativeElement.cloneNode(true) as HTMLElement;
    const fakeHeader = StyleUtils.styledElement(clonedHeader, {
      position : 'static',
      zIndex : '1',
      boxShadow : 'none'
    });
    this.headerAreaElementRef.nativeElement.appendChild(fakeHeader);
  }

  private registerChangeTemplateEventForFooter() {
    this.windowEventService.addViewportDimensionDetectListener(viewportDimension => {
      switch(viewportDimension) {
        case ViewportDimension.DESKTOP :
          this.appendFixedFooterToHeader();
          break;
        case ViewportDimension.TABLET :
        case ViewportDimension.MOBILE :
          this.appendBlockFooterToContents();
          break;
      }
    }, true)
  }

  private appendFixedFooterToHeader() {
    Object.assign(this.footerAreaElementRef.nativeElement.style, {
      width : `${this.headerAreaElementRef.nativeElement.offsetWidth}px`,
      position : 'fixed',
      bottom   : '0'
    });
    this.headerAreaElementRef.nativeElement.appendChild(this.footerAreaElementRef.nativeElement);
  }

  private appendBlockFooterToContents() {
    Object.assign(this.footerAreaElementRef.nativeElement.style, {
      width : `100%`,
      position : 'static'
    });
    this.contentsAreaElementRef.nativeElement.appendChild(this.footerAreaElementRef.nativeElement);
  }
}


