import {Component} from '@angular/core';
import {NameCard} from '../types';

@Component({
  selector: 'view-name-card',
  templateUrl: './name-card.component.html',
  styleUrls: ['./name-card.component.scss']
})
export class NameCardComponent{
  public nameCards : NameCard[] = [
    {
      stringContents : ['최경수 (a.k.a Mommoo)']
    },
    {
      stringContents : ['dv.mommoo@gmail.com'],
      imgPath : '/assets/images/email.png'
    },
    {
      stringContents : ['www.mommoo.tistory.com'],
      imgPath : '/assets/images/blog.png'
    },
    {
      stringContents : ['www.github.com/mommoo'],
      imgPath : '/assets/images/github.png'
    },
    {
      stringContents : ['서울과학기술대학교 컴퓨터공학과 학사', '서울과학기술대학교 컴퓨터공학과 석사'],
      imgPath : '/assets/images/degree.png'
    }
  ]

  constructor() {}
}
