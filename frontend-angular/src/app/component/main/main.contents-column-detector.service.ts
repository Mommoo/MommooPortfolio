import {Injectable} from '@angular/core';
import {ItemFinder} from '../../../mommoo-library/data-structure/item-finder';
import {
  ColumnItemWidth,
  ColumnLayout,
  ColumnLayoutChangeListener,
  invalidColumnLayout,
  SubscribeContext
} from './main.types';

/**
 * This is class provides the number of item columns to display in the contents
 * when the contents width changes.
 *
 * It is provided by {@link MainComponent}'s service instance,
 *
 * There are two ways to detect layout changed.
 * One is the width of contents has changed. {@link notifyEventToAllIfUpdated}
 * The other is the number of item columns in the contents has changed.
 * {@link notifyEventToAll}, {@link notifyEventToSubscribers}
 *
 */
@Injectable()
export class MainContentsColumnDetector {
  private readonly contextFinder = new ItemFinder<SubscribeContext>();
  private viewportWidth: number;

  private computeColumnLayout(context: SubscribeContext): ColumnLayout {
    const preferredMaxWidth = context.columnItemWidth.preferred;
    const minWidth = context.columnItemWidth.minimum;

    /* to improve performance algorithm, if there is previous data, set it to variable */
    let expectedNumberOfItem = Math.max(context.columnLayout.count, 1);

    while (true) {
      const expectedItemWidth = this.viewportWidth / expectedNumberOfItem;

      if (expectedItemWidth > preferredMaxWidth) {
        expectedNumberOfItem++;
        continue;
      }

      if (expectedNumberOfItem !== 1) {
        const previousExpectCardSize = this.viewportWidth / (expectedNumberOfItem - 1);

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

  private notifyEventToAll(): void {
    const contextValues = Array.from(this.contextFinder.readonlyMap().values());
    this.notifyEventToSubscribers(contextValues);
  }

  private notifyColumnChangeEvent(subscribeContext: SubscribeContext) {
    const computedLayout = this.computeColumnLayout(subscribeContext);

    const isNeedToNotify = computedLayout.count !== subscribeContext.columnLayout.count;

    if ( isNeedToNotify ) {
      subscribeContext.eventListener(computedLayout);
      subscribeContext.columnLayout = computedLayout;
    }
  }

  private notifyEventToSubscribers(contexts: SubscribeContext[]): void {
    if (this.viewportWidth) {
      contexts.forEach(context => this.notifyColumnChangeEvent(context));
    }
  }

  public notifyEventToAllIfUpdated(contentsWidth: number) {
    const isUpdated = contentsWidth && this.viewportWidth !== contentsWidth;
    if ( isUpdated ) {
      this.viewportWidth = contentsWidth;
      this.notifyEventToAll();
    }
  }


  public subscribe(columnItemWidth: ColumnItemWidth, columnLayoutChangeListener: ColumnLayoutChangeListener): string {
    const context: SubscribeContext = {
      columnItemWidth: columnItemWidth,
      eventListener: columnLayoutChangeListener,
      columnLayout: invalidColumnLayout
    };

    const eventID = this.contextFinder.addItem(context);
    this.notifyEventToSubscribers([context]);
    return eventID;
  }

  public unSubscribe(eventID: string) {
    this.contextFinder.removeItem(eventID);
  }
}
