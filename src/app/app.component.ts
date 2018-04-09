import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification-service/notification.service';
import { CookieService } from './cookie-service/cookie.service';
import { UserNotification } from './notification/notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  private notificationToggle = false;
  constructor(private notificationService: NotificationService, private cookieService: CookieService) {}

  ngOnInit() {
    this.notificationService.getUserNotifications(this.cookieService.getCookie('sid'));
  }

  markAsRead(notification: UserNotification) {
    this.notificationService.markAsRead(notification._id);
  }

  markAllAsRead() {
    const tempNotifications = [...this.notificationService.notifications];
    tempNotifications.forEach(n => this.notificationService.markAsRead(n._id));
  }

  toggleNotifications() {
    this.notificationToggle = !this.notificationToggle;
  }
}
