import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './view/footer/footer.component';
import {MommooUIModule} from './ui/ui.module';
import {WindowEventService} from './common/window-event.service';
import {CommonDataService} from './common/common-data.service';
import {ViewModule} from './view/view.module';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MommooUIModule,
    ViewModule
  ],
  providers: [WindowEventService, CommonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
