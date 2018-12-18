import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ContentsLayoutDetector} from './contents-layout-finder.service';
import {WindowSizeEventHandler} from '../../../mommoo-library/handler/window/size/window-size-handler';

@Component({
  selector: 'view-contents',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ContentsLayoutDetector]
})
export class ContentsComponent implements OnInit {

  public constructor(private contentsViewportHandler: ContentsLayoutDetector) {
  }

  public ngOnInit(): void {
    this.contentsViewportHandler.ngOnInit();
  }
}


