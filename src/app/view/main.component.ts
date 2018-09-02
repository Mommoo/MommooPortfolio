import { Component, OnInit } from '@angular/core';

const template : string = `<view-profile></view-profile>
            <view-about></view-about>
            <view-portfolio></view-portfolio>`;

@Component({
  selector: 'view-main',
  template: template,
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
