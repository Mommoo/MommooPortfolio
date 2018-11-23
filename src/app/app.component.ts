import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {DomUtils} from '../mommoo-library/util/dom';
import {WindowEventHandler} from '../mommoo-library/handler/window/window-event';
import {ViewportSize} from '../mommoo-library/handler/window/type';
import {AppToolkit} from './app-toolkit';

/**
 * this app component have role that as root component, need to initializing AppToolkit{@link AppToolkit}
 * this app also provide of changing view template structure according to media-query condition.
 * changing of view template structure is be through WindowEventHandler {@link WindowEventHandler} and app's css
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private templateChangeEventID;

  @ViewChild('headerArea')
  private headerAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('contentsArea')
  private contentsAreaElementRef: ElementRef<HTMLElement>;

  @ViewChild('footerArea')
  private footerAreaElementRef: ElementRef<HTMLElement>;

  public constructor(injector: Injector) {
    AppToolkit.getInstance().setInjector(injector);
  }

  public ngAfterViewInit(): void {
    this.templateChangeEventID = WindowEventHandler
      .addViewportChangeEvent(this.footerMoveEventListener(), true);
  }

  private footerMoveEventListener() {
    const computeTemplateCondition = (viewportSize: ViewportSize) => {
      /** targetRef is where footer element appending */
      let targetRef, footerStyle;

      if ( viewportSize === ViewportSize.DESKTOP ) {
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

      return {targetRef, footerStyle}
    };

    return (viewportSize: ViewportSize) => {
      const {targetRef, footerStyle} = computeTemplateCondition(viewportSize);
      DomUtils.applyStyle(this.footerAreaElementRef, footerStyle);
      DomUtils.append(targetRef, this.footerAreaElementRef);
    };
  }

  public ngOnDestroy(): void {
    WindowEventHandler.removeEvent(this.templateChangeEventID);
  }
}
// export class AppComponent{
//
// }

