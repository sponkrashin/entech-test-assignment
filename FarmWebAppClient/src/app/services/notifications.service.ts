import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsSubject = new Subject<string>();

  notifications$ = this.notificationsSubject.asObservable();

  add(message: string) {
    this.notificationsSubject.next(message);
  }
}
