import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {BasicContentsComponent} from './component/main/basic-contents/basic-contents.component';
import {ProjectContentsComponent} from './component/main/project-contents/project-contents.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: 'main', component: MainComponent, children:
      [
        {path: '', component: BasicContentsComponent},
        {path: 'test', component: ProjectContentsComponent}
      ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
