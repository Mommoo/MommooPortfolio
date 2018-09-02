import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MommooUIModule} from './ui/ui.module';
import {WindowEventService} from './common/window-event.service';
import {CommonDataService} from './common/common-data.service';
import {ViewModule} from './view/view.module';
import {fakeBackendProvider} from './mock-backend/MockBackEndService';
import {AppRoutingModule} from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MommooUIModule,
    ViewModule,
    AppRoutingModule
  ],
  providers: [WindowEventService, CommonDataService, fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
