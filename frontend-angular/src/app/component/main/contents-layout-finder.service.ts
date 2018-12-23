import {Injectable} from '@angular/core';
import {ItemFinder} from '../../../mommoo-library/data-structure/item-finder';
import {ContentsItem, ContentsLayout, ContentsLayoutChangeListener, SubscribeContext} from './main.types';

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
export class ContentsLayoutDetector {
  private readonly contextFinder = new ItemFinder<SubscribeContext>();
  private contentsWidth: number;

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

  private notifyEventToAll(): void {
    const contextValues = Array.from(this.contextFinder.readonlyMap().values());
    this.notifyEventToSubscribers(contextValues);
  }


  private notifyEventToSubscribers(contextValues: SubscribeContext[]): void {
    if (!this.contentsWidth) {
      return;
    }

    contextValues.forEach(context => {
      const properLayout
        = ContentsLayoutDetector.findProperContentsLayout(this.contentsWidth, context);

      const isNeedToNotify
        = properLayout.numberOfItem !== context.previousContentsLayout.numberOfItem;

      if ( isNeedToNotify ) {
        context.eventListener(properLayout);
        context.previousContentsLayout = properLayout;
      }
    });
  }

  public notifyEventToAllIfUpdated(contentsWidth: number) {
    const isUpdated = contentsWidth && this.contentsWidth !== contentsWidth;
    if ( isUpdated ) {
      this.contentsWidth = contentsWidth;
      this.notifyEventToAll();
    }
  }

  public subscribe(contentsItem: ContentsItem, contentsChangeListener: ContentsLayoutChangeListener): string {

    const context: SubscribeContext = {
      contentsItem: contentsItem,
      eventListener: contentsChangeListener,
      previousContentsLayout: ContentsLayout.invalidInstance
    };

    const eventID =  this.contextFinder.addItem(context);

    this.notifyEventToSubscribers([context]);

    return eventID;
  }

  public unSubscribe(eventID: string) {
    this.contextFinder.removeItem(eventID);
  }
}
