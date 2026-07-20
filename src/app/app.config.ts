import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_SETTING } from './setting/token';
import { authInterceptor } from './interceptors/authInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide:APP_SETTING,
      useValue:{
        apiUrl: 'http://localhost:9090/rest/',
        pageSize:4
      }
    },
    provideHttpClient(
       withInterceptors([authInterceptor])    // interceptor registration
    ),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration()
  ]
};
