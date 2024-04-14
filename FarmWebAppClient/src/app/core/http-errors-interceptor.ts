import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { NotificationsService } from 'services/notifications.service';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private notificationsService: NotificationsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (response: HttpErrorResponse) =>
          this.notificationsService.add(response.error),
      })
    );
  }
}
