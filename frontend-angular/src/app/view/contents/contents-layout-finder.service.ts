import {ElementRef, Injectable, OnDestroy, OnInit} from '@angular/core';
import {
  ContentsLayoutChangeListener,
  SubscribeContext,
  ContentsItem,
  ContentsLayout
} from './contents.types';
import {ItemFinder} from '../../../mommoo-library/data-structure/item-finder';
import {WindowSizeEventHandler} from '../../../mommoo-library/handler/window/size/window-size-handler';

/**
 * This is class provides the number of items to display in the contents
 * when the contents width changes.
 *
 * Because it is provided by {@link ContentsComponent}'s service instance,
 * the service share OnDestroy life-cycle with {@link ContentsComponent}
 * but, the service also need to OnInit life-cycle too, it is called by {@link ContentsComponent}.
 * {@link ContentsComponent#ngOnInit}
 *
 * Only when a number of item changed compared with previous thing,
 * it is notify to subscriber that contents layout changed.
 * {@link notifyEventToAllIfUpdated}, {@link notifyEventToSubscribersIfUpdated}
 *
 */
@Injectable()
export class ContentsLayoutDetector implements OnInit, OnDestroy {
  private readonly contextFinder = new ItemFinder<SubscribeContext>();
  private readonly resizingEventID: string;

  public constructor(private contentsElementRef: ElementRef<HTMLElement>) {
    this.resizingEventID = WindowSizeEventHandler.addResizingEvent(
      () => this.notifyEventToAllIfUpdated());
  }

  private static findProperContentsLayout(containerWidth: number, context: SubscribeContext): ContentsLayout {

    const preferredMaxWidth = context.contentsItem.preferredWidth;
    const minWidth = context.contentsItem.minWidth;

    /* to improve performance algorithm, if there is previous data, set it to variable */
    let expectedNumberOfItem = Math.max(context.previousContentsLayout.numberOfItem, 1);

    while (true) {
      const expectedItemWidth = containerWidth / expectedNumberOfItem;

      if (expectedItemWidth > preferredMaxWidth) {
        expectedNumberOfItem++;
        continue;
      }

      if (expectedNumberOfItem !== 1) {
        const previousExpectCardSize = containerWidth / (expectedNumberOfItem - 1);

        const isNotExistProperSize
          = previousExpectCardSize < minWidth && expectedItemWidth < minWidth;

        if ( isNotExistProperSize ) {
          expectedNumberOfItem--;
          continue;
        }

        const previousSub = Math.abs(previousExpectCardSize - preferredMaxWidth);
        const currentSub = preferredMaxWidth - expectedItemWidth;

        const isLongerOneNearPreferred = previousSub < currentSub;
        /** Even though the current one closer to preferred max card width than longer one,
         * if card size is shorter than preferred min value,
         * we choice longer one not current one */
        const isTooShortNotThinkNear = expectedItemWidth < minWidth;

        if (isLongerOneNearPreferred || isTooShortNotThinkNear) {
          return new ContentsLayout(expectedNumberOfItem - 1, previousExpectCardSize);
        }
      }

      return new ContentsLayout(expectedNumberOfItem, expectedItemWidth);
    }
  }

  private notifyEventToAllIfUpdated(): void {
    const contextValues = Array.from(this.contextFinder.readonlyMap().values());
    this.notifyEventToSubscribersIfUpdated(contextValues);
  }


  private notifyEventToSubscribersIfUpdated(contextValues: SubscribeContext[]): void {
    if (!this.contentsElementRef.nativeElement) {
      return;
    }

    const containerWidth = this.computeCurrentContainerWidth();

    contextValues.forEach(context => {
      const properLayout
        = ContentsLayoutDetector.findProperContentsLayout(containerWidth, context);

      const isNeedToNotify
        = properLayout.numberOfItem !== context.previousContentsLayout.numberOfItem;

      if ( isNeedToNotify ) {
        context.eventListener(properLayout);
        context.previousContentsLayout = properLayout;
      }
    });
  }

  private computeCurrentContainerWidth(): number | undefined {
    if (this.contentsElementRef.nativeElement) {
      return Math.round(this.contentsElementRef.nativeElement.getBoundingClientRect().width);
    }

    return undefined;
  }

  public subscribe(contentsItem: ContentsItem, contentsChangeListener: ContentsLayoutChangeListener): string {

    const context: SubscribeContext = {
      contentsItem: contentsItem,
      eventListener: contentsChangeListener,
      previousContentsLayout: ContentsLayout.invalidInstance
    };

    const eventID =  this.contextFinder.addItem(context);

    this.notifyEventToSubscribersIfUpdated([context]);

    return eventID;
  }

  public unSubscribe(eventID: string) {
    this.contextFinder.removeItem(eventID);
  }

  public ngOnInit(): void {
    this.notifyEventToAllIfUpdated();
  }

  public ngOnDestroy(): void {
    WindowSizeEventHandler.removeEvent(this.resizingEventID);
  }
}
