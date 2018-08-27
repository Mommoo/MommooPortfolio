import { Component, OnInit } from '@angular/core';
import {CommonDataService} from '../../common/common-data.service';

@Component({
  selector: 'view-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
//TODO guide 컴포넌트에 자식 템플릿 넣고, 그걸 컨트롤 하는 방법 찾기!!
export class ProfileComponent implements OnInit {
  public themeColor : string;
  constructor(private commonDataService : CommonDataService) {
    this.themeColor = commonDataService.getThemeColor();
  }

  ngOnInit() {
  }

}
