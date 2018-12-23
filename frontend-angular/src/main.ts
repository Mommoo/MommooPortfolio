import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {BrowserValidator} from './browser-validator';

if (environment.production) {
  enableProdMode();
}

if ( BrowserValidator.check() ) {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}



