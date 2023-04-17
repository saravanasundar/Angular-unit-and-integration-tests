// import './polyfills';

// import './test/jasmine-setup';

// import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
// import 'jasmine-core/lib/jasmine-core/boot.js';

// // import './test.ts';

// import { AppModule } from './app/app.module';

// import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// platformBrowserDynamicTesting()
//   .bootstrapModule(AppModule)
//   .then((ref) => {
//     // Ensure Angular destroys itself on hot reloads.
//     if (window['ngRef']) {
//       window['ngRef'].destroy();
//     }
//     window['ngRef'] = ref;

//     // Otherise, log the boot error
//   })
//   .catch((err) => console.error(err));

// (function bootstrap() {
//   if (window['jasmineRef']) {
//     location.reload();

//     return;
//   }

//   window.onload(new Event('anything'));
//   // window['jasmineRef'] = jasmine.getEnv();
// })();


import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)