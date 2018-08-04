import {Component, Input} from '@angular/core';
import {SkillCard} from './skill-card';

@Component({
  selector: 'ui-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent{

  @Input() skillCardData : SkillCard;

  constructor() {

  }

}
