import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {WelcomeModule} from './section/welcome/welcome.module';
import {ProfileModule} from './section/profile/profile.module';
import {PortfolioModule} from './section/portfolio/portfolio.module';
import {AboutModule} from './section/about/about.module';
import {WindowScrollAnimator} from './window-scroll-animator';
import {BasicSectionModule} from './common/basic/basic-section.module';

@NgModule({
  imports:[
    CommonModule,
    BasicSectionModule,
    WelcomeModule,
    ProfileModule,
    AboutModule,
    PortfolioModule,
  ],
  exports:[
    HomeComponent
  ],
  providers:[
    WindowScrollAnimator
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
