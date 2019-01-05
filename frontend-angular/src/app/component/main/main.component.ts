import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {WindowSizeEventHandler} from '../../../mommoo-library/handler/window/size/window-size-handler';
import {BasicViewportSizeState} from '../../../mommoo-library/handler/window/size/window-size-handler.type';
import {DomUtils} from '../../../mommoo-library/util/dom';
import {MainComponentLayoutDetector} from './main.component-layout-detector.service';

/**
 * This class have role of manage component layout.
 *
 * The managing of component layout is to two things that
 * one is deciding of where footer element location {@link enrollFooterWhereToAppendEvent}
 * the others is compute elements of layout-detector.
 * {@link MainComponentLayoutDetector}, {@link enrollComputeComponentLayoutEvent}
 */

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements AfterViewInit, OnDestroy {
  private windowSizeEventIDs: string[];

  @ViewChild('headerArea', {read: ElementRef})
  private headerAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('contentsArea', {read: ElementRef})
  private contentsAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('footerArea', {read: ElementRef})
  private footerAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('fakeHeader', {read: ElementRef})
  private fakeHeaderElementRef: ElementRef<HTMLElement>;

  public constructor(private contentsLayoutDetector: MainComponentLayoutDetector) { }

  private enrollFooterWhereToAppendEvent() {
    return WindowSizeEventHandler
      .addBasicViewportSizeStateChangeEvent(viewportSizeState => {
        let whereAppendedArea, footerStyle;

        if (viewportSizeState === BasicViewportSizeState.LARGE) {
          whereAppendedArea = this.headerAreaElementRef;
          footerStyle = {
            width: `${DomUtils.offset(this.headerAreaElementRef).width}px`,
            position: 'fixed',
            bottom: '0'
          };
        } else {
          whereAppendedArea = this.contentsAreaElementRef;
          footerStyle = {
            width: `100%`,
            position: 'static'
          };
        }

        DomUtils.append(whereAppendedArea, this.footerAreaElementRef);
        DomUtils.applyStyle(this.footerAreaElementRef, footerStyle);
      }, true);
  }

  private enrollComputeComponentLayoutEvent() {
    /** we have to use computedStyle because offsetWidth contain padding value but we need to except it */
    const contentsComputedStyle = window.getComputedStyle(this.contentsAreaElementRef.nativeElement);

    return WindowSizeEventHandler
      .addResizingEvent(() => {
        const contentsWidth = Math.round(parseFloat(contentsComputedStyle.width));

        const collapsedHeaderHeight = this.fakeHeaderElementRef.nativeElement.offsetHeight;

        const isHeaderCollapsibleMode
          = WindowSizeEventHandler.getBasicViewportSizeState() !== BasicViewportSizeState.LARGE;

        this.contentsLayoutDetector
          .setLayoutData(contentsWidth, collapsedHeaderHeight, isHeaderCollapsibleMode);
      }, true);
  }

  public ngAfterViewInit(): void {
    const footerWhereToAppendEventID = this.enrollFooterWhereToAppendEvent();
    const computeComponentLayoutEventID = this.enrollComputeComponentLayoutEvent();

    this.windowSizeEventIDs = [
      footerWhereToAppendEventID,
      computeComponentLayoutEventID
    ];
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvents(...this.windowSizeEventIDs);
  }
}
