import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'detail-project-page',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailProjectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
