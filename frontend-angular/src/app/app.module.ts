import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRouterModule} from './app-router.module';
import {MainModule} from './component/main/main.module';
import {PageNotFoundModule} from './component/page-not-found/page-not-found.module';
import {AppResourceResolver} from './app-resource-resolver.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    PageNotFoundModule,
    AppRouterModule
  ],
  providers: [
    AppResourceResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
