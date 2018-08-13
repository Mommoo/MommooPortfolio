import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor() { }

  public getThemeColor() : string {
    return '#e53935';
  }
}
