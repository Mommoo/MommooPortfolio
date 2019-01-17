import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebClientHttpClient} from './web-client-resource.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WebClientHttpClient
  ],
  declarations: []
})
export class WebClientModule { }
