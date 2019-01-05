import {Injectable} from '@angular/core';
import {ItemFinder} from '../../../mommoo-library/data-structure/item-finder';
import {
  ColumnItemWidth,
  ColumnLayout,
  ColumnLayoutChangeListener, HeaderLayout,
  Subscriber
} from './main.types';

/**
 * This class is provides main component layout information such as column layout, header layout
 * {@link ColumnLayout}, {@link HeaderLayout}
 *
 * The column layout is to be notified to subscriber
 * when layout's elements changed compared previous column layout
 * {@link setLayoutData}, {@link notifyContentsChangeToSubscribers}
 * The base container for column layout is MainComponent's contents area
 * {@link MainComponent#contentsAreaElementRef}
 *
 * The header layout have be called anytime and anywhere.
 * {@link getHeaderLayout}
 */
@Injectable()
export class MainComponentLayoutDetector {
  private static readonly invalidColumnLayout: ColumnLayout = {count: -1, width: -1};
  private readonly subscriberFinder = new ItemFinder<Subscriber>();
  private contentsWidth: number;
  private collapsedHeaderHeight: number;
  private isHeaderCollapsibleMode: boolean;

  private computeColumnLayout(context: Subscriber): ColumnLayout {
    const preferredMaxWidth = context.columnItemWidth.preferred;
    const minWidth = context.columnItemWidth.minimum;

    /* to improve performance algorithm, if there is previous data, set it to variable */
    let expectedNumberOfItem = Math.max(context.columnLayout.count, 1);

    while (true) {
      const expectedItemWidth = this.contentsWidth / expectedNumberOfItem;

      if (expectedItemWidth > preferredMaxWidth) {
        expectedNumberOfItem++;
        continue;
      }

      if (expectedNumberOfItem !== 1) {
        const previousExpectCardSize = this.contentsWidth / (expectedNumberOfItem - 1);

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
          return {
            count: expectedNumberOfItem - 1,
            width: previousExpectCardSize
          };
        }
      }
      return {
        count: expectedNumberOfItem,
        width: expectedItemWidth
      };
    }
  }

  private notifyColumnLayoutToSubscriberIfChanged(subscriber: Subscriber) {
    const computedLayout = this.computeColumnLayout(subscriber);

    const isNeedToNotify = computedLayout.count !== subscriber.columnLayout.count;

    if ( isNeedToNotify ) {
      subscriber.eventListener(computedLayout);
      subscriber.columnLayout = computedLayout;
    }
  }

  private notifyContentsChangeToSubscriber(subscriber: Subscriber): void {
    this.notifyColumnLayoutToSubscriberIfChanged(subscriber);
  }

  private notifyContentsChangeToSubscribers(subscribers: Subscriber[]): void {
    subscribers
      .forEach(subscriber => this.notifyContentsChangeToSubscriber(subscriber));
  }

  public setLayoutData(contentsWidth: number,
                       collapsedHeaderHeight: number,
                       isHeaderCollapsibleMode: boolean) {

    const isContentsUpdated = contentsWidth && this.contentsWidth !== contentsWidth;
    this.contentsWidth = contentsWidth;
    this.collapsedHeaderHeight = collapsedHeaderHeight;
    this.isHeaderCollapsibleMode = isHeaderCollapsibleMode;

    if (isContentsUpdated) {
      const contextValues = Array.from(this.subscriberFinder.readonlyMap().values());
      this.notifyContentsChangeToSubscribers(contextValues);
    }
  }

  public getHeaderLayout(): HeaderLayout {
    return {
      isCollapseMode: this.isHeaderCollapsibleMode,
      collapseHeaderHeight: this.collapsedHeaderHeight
    };
  }

  public subscribeContentsColumnChange(columnItemWidth: ColumnItemWidth, columnLayoutChangeListener: ColumnLayoutChangeListener): string {
    const subscriber: Subscriber = {
      columnItemWidth: columnItemWidth,
      eventListener: columnLayoutChangeListener,
      columnLayout: MainComponentLayoutDetector.invalidColumnLayout
    };

    const isContentsExist = this.contentsWidth !== undefined;
    if (isContentsExist) {
      this.notifyContentsChangeToSubscribers([subscriber]);
    }

    return this.subscriberFinder.addItem(subscriber);
  }

  public unSubscribe(eventID: string) {
    this.subscriberFinder.removeItem(eventID);
  }
}
