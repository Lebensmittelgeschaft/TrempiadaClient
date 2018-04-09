import { Injectable } from '@angular/core';
import { UserNotification } from '../notification/notification.model';
import { NotificationHttpService } from '../notification/notification-http-service/notification-http.service';

@Injectable()
export class NotificationService {

  public notifications: UserNotification[] = [];
  constructor(private notificationHttpService: NotificationHttpService) { }

  getUserNotifications(id: string) {
    const sub = this.notificationHttpService.getUserNotifications(id).subscribe((notifications) => {
      this.notifications = notifications;

      sub.unsubscribe();
    });
  }

  markAsRead(id: string) {
    const sub = this.notificationHttpService.markAsRead(id).subscribe((notification) => {
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i]._id === notification._id) {
          this.notifications.splice(i, 1);

          break;
        }
      }

      sub.unsubscribe();
    });
  }
}
