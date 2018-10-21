import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePage} from './home.component';
import {WelcomeModule} from './section/welcome/welcome.module';
import {ProfileModule} from './section/profile/profile.module';
import {AboutModule} from './section/about/about.module';
import {WindowScrollAnimator} from './window-scroll-animator';
import {BasicSectionModule} from './common/basic/basic-section.module';
import {SimpleProjectModule} from './section/simple-project/simple-project.module';

@NgModule({
  imports:[
    CommonModule,
    BasicSectionModule,
    WelcomeModule,
    ProfileModule,
    AboutModule,
    SimpleProjectModule,
  ],
  exports:[
    HomePage
  ],
  providers:[
    WindowScrollAnimator
  ],
  declarations: [
    HomePage
  ]
})
export class HomeModule {}
