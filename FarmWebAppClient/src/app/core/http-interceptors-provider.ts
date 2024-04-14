import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorsInterceptor } from './http-errors-interceptor';

export const interceptorsProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorsInterceptor,
  multi: true,
};
