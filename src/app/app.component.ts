import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnimationSetting} from './common/animationSetting';
import {WindowEventService} from './common/window-event.service';

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
export class AppComponent implements AfterViewInit {
  @ViewChild('navigationHeaderArea')
  private navigationHeaderAreaElementRef: ElementRef;

  @ViewChild('fixedHeaderWrapper')
  private fixedHeaderWrapper: ElementRef;

  ngAfterViewInit(): void {
    /** fixedHeader가 부모 영역을 벗어나기 때문에,
     * Header를 복사한 후 fixed 성질을 지우고 부모창에 붙여 block 구조를 살린다. */
    const fakeHeader = this.cloneHeader();
    this.navigationHeaderAreaElementRef.nativeElement.appendChild(fakeHeader);
  }

  private cloneHeader() : HTMLElement {
    const cloneHeader = this.fixedHeaderWrapper.nativeElement.cloneNode(true);
    Object.assign(cloneHeader.style, {
      position : 'static',
      zIndex : '1',
      boxShadow : 'none'
    });
    return cloneHeader;
  }
}


