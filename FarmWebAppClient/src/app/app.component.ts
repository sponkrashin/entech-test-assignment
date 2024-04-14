import { Component, WritableSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationsService } from 'services/notifications.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showNotification: WritableSignal<boolean> = signal(false);
  notification: WritableSignal<string | null> = signal(null);

  constructor(private notificationsService: NotificationsService) {
    let timeoutRef: any;

    this.notificationsService.notifications$
      .pipe(takeUntilDestroyed())
      .subscribe((notification) => {
        this.showNotification.set(true);
        this.notification.set(notification);

        clearTimeout(timeoutRef);
        timeoutRef = setTimeout(() => this.showNotification.set(false), 5000);
      });
  }
}
