import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {WindowSizeEventHandler} from '../../../mommoo-library/handler/window/size/window-size-handler';
import {BasicViewportSizeState} from '../../../mommoo-library/handler/window/size/window-size-handler.type';
import {DomUtils} from '../../../mommoo-library/util/dom';
import {ContentsLayoutDetector} from './contents-layout-finder.service';
import {ContentsLayout} from './contents/contents.types';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ContentsLayoutDetector]
})
export class MainComponent implements AfterViewInit, OnDestroy {
  private templateChangeEventID;
  private resizingEventID;

  @ViewChild('headerArea')
  private headerAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('contentsArea')
  private contentsAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('footerArea')
  private footerAreaElementRef: ElementRef<HTMLElement>;

  private contentsComputedStyle;

  public constructor(private contentsLayoutDetector: ContentsLayoutDetector) {

  }

  public ngAfterViewInit(): void {
    this.contentsComputedStyle = getComputedStyle(this.contentsAreaElementRef.nativeElement);

    this.templateChangeEventID = WindowSizeEventHandler
      .addBasicViewportSizeStateChangeEvent(this.footerMoveEventListener(), true);

    this.resizingEventID = WindowSizeEventHandler
      .addResizingEvent(() => {
        const contentsWidth = this.computeContentsWidth();
        this.contentsLayoutDetector.notifyEventToAllIfUpdated(contentsWidth);
      }, true);
  }

  private computeContentsWidth() {
    if ( this.contentsComputedStyle ) {
      return Math.round(parseFloat(this.contentsComputedStyle.width));
    } else {
      return -1;
    }
  }

  private footerMoveEventListener() {
    const computeTemplateCondition = (viewportSizeState: BasicViewportSizeState) => {
      /** targetRef is where footer element appending */
      let targetRef, footerStyle;

      if ( viewportSizeState === BasicViewportSizeState.LARGE ) {
        targetRef = this.headerAreaElementRef;
        footerStyle = {
          width: `${DomUtils.offset(this.headerAreaElementRef).width}px`,
          position: 'fixed',
          bottom: '0'
        };
      } else {
        targetRef = this.contentsAreaElementRef;
        footerStyle = {width: `100%`, position: 'static'};
      }

      return {targetRef, footerStyle};
    };

    return (viewportSizeState: BasicViewportSizeState) => {
      const {targetRef, footerStyle} = computeTemplateCondition(viewportSizeState);
      DomUtils.applyStyle(this.footerAreaElementRef, footerStyle);
      DomUtils.append(targetRef, this.footerAreaElementRef);
    };
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvents(this.templateChangeEventID, this.resizingEventID);
  }
}
