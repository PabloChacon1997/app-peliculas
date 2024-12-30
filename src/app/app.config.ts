import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_FAB_DEFAULT_OPTIONS } from '@angular/material/button';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()), 
    provideAnimationsAsync(),
  {provide: MAT_FAB_DEFAULT_OPTIONS, useValue: {subscriptSizing: 'dynamic'}},
  provideMomentDateAdapter({
    parse: {
      dateInput: ['DD-MM-YYYY']
    },
    display: {
      dateInput: 'DD-MM-YYYY',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMM YYYY'
    }
  })]
};
