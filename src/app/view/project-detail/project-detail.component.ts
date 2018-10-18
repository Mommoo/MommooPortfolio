import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'view-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
//TODO 이건 나중에 프로젝트 하위 항목으로 들어가야 할듯
export class ProjectDetailComponent implements OnInit {

  constructor(route : ActivatedRoute) {
    console.log(route.snapshot);
    console.log(route.snapshot.params['id']);
  }

  ngOnInit() {
  }

  public back() {

  }
}
