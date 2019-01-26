import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicContentsComponent} from './basic-contents.component';
import {MommooUIModule} from '../../../../../mommoo-library/ui/ui.module';
import {ServerModule} from '../../../../server/server.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {BannerComponent} from './banner/banner.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ProjectComponent } from './project/project.component';

@NgModule({
  imports: [
    CommonModule,
    MommooUIModule,
    ServerModule,
  ],
  declarations: [
    BasicContentsComponent,
    WelcomeComponent,
    BannerComponent,
    ProfileComponent,
    AboutComponent,
    ProjectComponent
  ]
})
export class BasicContentsModule { }
