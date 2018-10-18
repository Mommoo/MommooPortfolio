import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './page/home/home.component';
import {ProjectDetailComponent} from '../project-detail/project-detail.component';

export const ROUTES : Routes = [
  {path : 'home', component : HomeComponent},
  {path : '', redirectTo : 'home', pathMatch:'full'},
  {path : 'home/:id', component : ProjectDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  exports: [
    RouterModule
  ]
})
export class ContentsRouteModule{

}
