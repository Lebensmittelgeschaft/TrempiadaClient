import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserNotification } from '../notification.model';

@Injectable()
export class NotificationHttpService {

  constructor(private httpClient: HttpClient) { }

  getUserNotifications(id: string) {
    return this.httpClient.get<UserNotification[]>(`http://localhost:3000/notification/user/${id}`,
      { responseType: 'json', observe: 'body', withCredentials: true });
  }

  markAsRead(id: string) {
    return this.httpClient.put<UserNotification>(`http://localhost:3000/notification/${id}/read`,
      { responseType: 'json', observe: 'body', withCredentials: true });
  }
}
