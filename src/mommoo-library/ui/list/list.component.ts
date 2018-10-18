import {AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, OnInit} from '@angular/core';
import {DomUtils} from '../../util/dom';
import {MommooListTitle} from './list-title.component';

@Component({
  selector: 'mommoo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush,
  host : {
    id : 'list'
  }
})
export class MommooList implements OnInit, AfterContentInit {

  @ContentChild(MommooListTitle, {read : ElementRef})
  private mommooListTitle : ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    DomUtils.move(this.mommooListTitle, 0);
  }
}
