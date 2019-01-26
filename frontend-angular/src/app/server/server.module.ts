import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebClientHttpClient} from './webclient/web-client-resource.service';
import {HttpClientModule} from '@angular/common/http';
import {ResourceHttpClient} from './resource/resource-httpclient.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WebClientHttpClient,
    ResourceHttpClient
  ],
  declarations: []
})
export class ServerModule { }
