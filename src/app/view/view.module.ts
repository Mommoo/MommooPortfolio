import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileModule} from './profile/profile.module';
import {AboutModule} from './about/about.module';
import {HeaderModule} from './header/header.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import {FooterModule} from './footer/footer.module';
import {RouterModule, Routes} from '@angular/router';
import {ContentsComponent, MainComponent} from './template.component';

const routes : Routes = [
  {path : 'main', component : MainComponent},
  {path : '', redirectTo : 'main', pathMatch:'full'}
];

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    ProfileModule,
    AboutModule,
    PortfolioModule,
    FooterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    HeaderModule,
    ProfileModule,
    AboutModule,
    PortfolioModule,
    FooterModule,
    RouterModule,
    ContentsComponent
  ],
  declarations: [ContentsComponent, MainComponent]
})
export class ViewModule {
}
