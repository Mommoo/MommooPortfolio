import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileModule} from './profile/profile.module';
import {AboutModule} from './about/about.module';
import {HeaderModule} from './header/header.module';
import {PortfolioModule} from './portfolio/portfolio.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    AboutModule,
    HeaderModule,
    PortfolioModule
  ],
  exports: [
    ProfileModule,
    AboutModule,
    HeaderModule,
    PortfolioModule
  ],
  declarations: []
})
export class ViewModule {
}
