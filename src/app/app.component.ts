import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification-service/notification.service';
import { CookieService } from './cookie-service/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private notificationService: NotificationService, private cookieService: CookieService) {}

  ngOnInit() {
    this.notificationService.getUserNotifications(this.cookieService.getCookie('sid'));
  }

  clearCount() {
    this.notificationService.notifications = [];
  }
}
