import { Injectable } from '@angular/core';
import {MommooCard} from './card.component';

@Injectable({
  providedIn: 'root'
})
export class MommooCardsLoadCheckerService {

  constructor() { }

  public checkCardsLoaded(mommooCards : MommooCard[], onCompleteListener : ()=>void) {
    const checker : boolean[] = new Array(mommooCards.length).fill(false, 0, mommooCards.length);
    console.log('checkCardsLoaded!!');
    const executeListenerIfAllLoaded = ()=> {
      console.log('imageAllLoaded!!');
      const isAllLoaded = checker.every(isLoaded => isLoaded);
      if ( isAllLoaded ) {
        onCompleteListener();
      }
    };

    mommooCards
      .map(mommooCard => mommooCard as any)
      .forEach((mommooCard, index) => mommooCard._watchImageLoaded(()=>{
        checker[index] = true;
        executeListenerIfAllLoaded();
      }))
  }
}
