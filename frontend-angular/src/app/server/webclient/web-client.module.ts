import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WebClientDataLoader} from './web-client-resource.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    WebClientDataLoader
  ],
  declarations: []
})
export class WebClientModule { }
