import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { CookieService } from '../../cookie-service/cookie.service';
import { ICollection } from '../../collection/collection.interface';
import { Ride } from '../../ride/ride.model';

@Injectable()
export class UserHttpService {

  constructor(private httpClient: HttpClient) { }

  getRides(userid: string, page?: number, size?: number) {
    let params: HttpParams = new HttpParams();
    if (page !== undefined && size !== undefined && page >= 0 && size >= 0) {
      params = params.append('p', page.toString()).append('ps', size.toString());
    }

    return this.httpClient.get<ICollection<Ride>>(`http://localhost:3000/user/${userid}/ride/active`,
      { responseType: 'json', observe: 'body', withCredentials: true, params });
  }
}
