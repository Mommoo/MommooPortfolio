import {NumberUtils} from './number';

export class NumberIdGenerator {
  private readonly numberIDSet = new Set<string>();

  public constructor(private digitNumber: number = 6) {

  }

  public generate() : string {
    let numberID : string;
    do{
      numberID = this.getRandomNumber();
    } while(this.numberIDSet.has(numberID));

    this.numberIDSet.add(numberID);
    return numberID;
  }

  public hasID(numberID : string) : boolean {
    if ( this.isInValidCondition(numberID) ) {
      return false;
    }

    return this.numberIDSet.has(numberID);
  }

  public removeID(numberID : string) : boolean {
    if ( this.isInValidCondition(numberID) ) {
      return false;
    }

    return this.numberIDSet.delete(numberID);
  }

  private isInValidCondition(numberID : string) {
    return !NumberUtils.isNumeric(numberID) || numberID.length !== this.digitNumber;
  }

  private getRandomNumber() {
    const mathMaxDigitNumber = 16;
    let randomNumber : string = "";
    let nextDigitNumber = this.digitNumber;
    while ( nextDigitNumber !== 0 ) {
      const targetDigit = Math.min(mathMaxDigitNumber, nextDigitNumber);
      randomNumber += Math.random().toString().substring(2, 2 + targetDigit);
      nextDigitNumber -= targetDigit;
    }
    return randomNumber;
  }
}
