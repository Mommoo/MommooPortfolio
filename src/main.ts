/** Angular basic setting */
import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {BrowserValidator} from './browser-validator';

const angularBasicMainRunner = ()=> {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
};

if ( BrowserValidator.check() ) {
  angularBasicMainRunner();
}
