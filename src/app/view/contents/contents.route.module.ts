import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './page/home/home.component';
import {DetailProjectPage} from './page/detail-project/detail-project.component';

export const ROUTES : Routes = [
  {path : 'home', component : DetailProjectPage},
  {path : '', redirectTo : 'home', pathMatch:'full'},
  {path : 'home/:id', component : DetailProjectPage}
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
