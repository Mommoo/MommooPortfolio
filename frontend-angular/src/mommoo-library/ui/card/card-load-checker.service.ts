import { Injectable } from '@angular/core';
import {MommooCard} from './card.component';

@Injectable({
  providedIn: 'root'
})
export class MommooCardsLoadCheckerService {

  constructor() { }

  public promiseLoadCards(mommooCards: MommooCard[]) {
    const checker: boolean[] = new Array(mommooCards.length).fill(false, 0, mommooCards.length);

    return new Promise(resolve => {
      const executeListenerIfAllLoaded = () => {
        const isAllLoaded = checker.every(isLoaded => isLoaded);
        if ( isAllLoaded ) {
          resolve();
        }
      };

      mommooCards
        .forEach((mommooCard, index) => mommooCard.addCardLoadCompleteListener(() => {
          checker[index] = true;
          executeListenerIfAllLoaded();
        }));
    });
  }

  public checkCardsLoaded(mommooCards: MommooCard[], onCompleteListener: () => void) {
    const checker: boolean[] = new Array(mommooCards.length).fill(false, 0, mommooCards.length);
    const executeListenerIfAllLoaded = () => {
      const isAllLoaded = checker.every(isLoaded => isLoaded);
      if ( isAllLoaded ) {
        onCompleteListener();
      }
    };

    mommooCards
      .forEach((mommooCard, index) => mommooCard.addCardLoadCompleteListener(()=>{
        checker[index] = true;
        executeListenerIfAllLoaded();
      }));
  }
}
