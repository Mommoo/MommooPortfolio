import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileComponent} from './view/profile/profile.component';
import {HeaderComponent} from './view/header/header.component';
import {AboutComponent} from './view/about/about.component';
import {MenuButtonComponent} from './view/header/menu/menu-button/menu-button.component';
import {PortfolioComponent} from './view/portfolio/portfolio.component';
import {FooterComponent} from './view/footer/footer.component';
import {MenuListComponent} from './view/header/menu/menu-list/menu-list.component';
import {NameCardComponent} from './view/profile/name-card/name-card.component';
import {UiModule} from './ui/ui.module';
import {WindowEventService} from './common/window-event.service';
import {TestComponent} from './test/test.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    AboutComponent,
    FooterComponent,
    PortfolioComponent,
    MenuButtonComponent,
    MenuListComponent,
    NameCardComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule
  ],
  providers: [WindowEventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
