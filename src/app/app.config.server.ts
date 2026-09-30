import { mergeApplicationConfig, ApplicationConfig, APP_ID } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { Directionality } from '@angular/cdk/bidi';
import { Subject } from 'rxjs';

import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    // Provide APP_ID early so CDK's _IdGenerator (which uses inject(APP_ID) in a
    // field initializer) can resolve it during root-injector hydration in SSR.
    // This is a workaround for a CDK 22.2.0-next.7 prerelease bug.
    { provide: APP_ID, useValue: 'ng' },
    provideServerRendering(),
    {
      provide: Directionality,
      useValue: { value: 'ltr', change: new Subject<'ltr' | 'rtl'>() },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
