import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Ride } from './ride.model';
import { ICollection } from '../collection.interface';

@Injectable()
export class RideHttpService {

  constructor(private httpClient: HttpClient) { }

  getRides(page?: number, size?: number, search?: string, dateFilter?: Date) {
    let params: HttpParams = new HttpParams();
    if (page !== undefined && size !== undefined && page >= 0 && size >= 0) {
      params = params.append('p', page.toString()).append('ps', size.toString());
    }

    if (search) {
      params = params.append('q', search);
    }

    if (dateFilter && dateFilter.toDateString() !== 'Invalid Date') {
      const actualDatePicked = new Date(dateFilter.getTime() - dateFilter.getTimezoneOffset() * 60 * 1000);
      params = params.append('d', actualDatePicked.toISOString());
    }

    // TODO: Move backend address to env file.
    return this.httpClient.get<ICollection<Ride>>('http://localhost:3000/ride',
      { responseType: 'json', observe: 'body', params, withCredentials: true });
  }

  createRide(ride: Ride) {
    return this.httpClient.post<Ride>('http://localhost:3000/ride', ride, { withCredentials: true });
  }

  joinRide(ride: string, user: string) {
    return this.httpClient.put<Ride>(`http://localhost:3000/ride/${ride}/join`, { user }, { withCredentials: true });
  }
}
