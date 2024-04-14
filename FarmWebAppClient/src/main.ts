import {
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http';
import { interceptorsProvider } from 'core/http-interceptors-provider';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    interceptorsProvider,
  ],
};

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
