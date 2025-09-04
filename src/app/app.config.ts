import {
  ApplicationConfig,
  LOCALE_ID, 
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common'; // ✅ Funktion importieren
import localeDe from '@angular/common/locales/de';
import { provideHttpClient } from '@angular/common/http';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'de' },
    provideHttpClient()
  ],
};
