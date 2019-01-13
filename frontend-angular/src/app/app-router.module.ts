import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './component/main/main.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {BasicContentsComponent} from './component/main/contents/basic-contents/basic-contents.component';
import {ProjectContentsComponent} from './component/main/contents/project-contents/project-contents.component';
import {BasicContentsDataResolver} from './component/main/contents/basic-contents/basic-contents.resolver.service';
import {ProjectContentsDataResolver} from './component/main/contents/project-contents/project-contents.resolver.service';
import {AppIconPathDataResolver} from './app-icon-path-data-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    resolve: {
      appIconData: AppIconPathDataResolver
    },
    children: [
      {
        path: '',
        component: BasicContentsComponent,
        resolve: {
          'basicContentsData': BasicContentsDataResolver,
          appIconData: AppIconPathDataResolver
        }
      },
      {
        path: ':projectTitle',
        component: ProjectContentsComponent,
        resolve: {
          'projectContentsData': ProjectContentsDataResolver
        }
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  providers: [
    AppIconPathDataResolver,
    BasicContentsDataResolver,
    ProjectContentsDataResolver
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {}
