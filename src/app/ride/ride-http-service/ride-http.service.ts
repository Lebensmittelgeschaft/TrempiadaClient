import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Ride } from '../ride.model';
import { ICollection } from '../../collection/collection.interface';

@Injectable()
export class RideHttpService {

  constructor(private httpClient: HttpClient) { }

  getRideById(id: string) {
    return this.httpClient.get<Ride>(`http://localhost:3000/ride/${id}`,
      { responseType: 'json', observe: 'body', withCredentials: true });
  }

  getRides(page?: number, size?: number, search?: string, dateFilter?: Date) {
    let params: HttpParams = new HttpParams();
    if (page !== undefined && size !== undefined && page >= 0 && size >= 0) {
      params = params.append('p', page.toString()).append('ps', size.toString());
    }

    if (search) {
      params = params.append('q', search);
    }

    if (dateFilter && dateFilter.toDateString() !== 'Invalid Date') {
      params = params.append('d', dateFilter.toISOString());
    }

    // TODO: Move backend address to env file.
    return this.httpClient.get<ICollection<Ride>>('http://localhost:3000/ride',
      { responseType: 'json', observe: 'body', params, withCredentials: true });
  }

  createRide(ride: Ride) {
    ride.departureDate.setUTCSeconds(0);
    return this.httpClient.post<Ride>('http://localhost:3000/ride', ride, { withCredentials: true });
  }

  joinRide(ride: string, user: string) {
    return this.httpClient.put<Ride>(`http://localhost:3000/ride/${ride}/join`, { user }, { withCredentials: true });
  }

  updateRide(ride: Ride) {
    ride.departureDate.setUTCSeconds(0);
    return this.httpClient.put<Ride>(`http://localhost:3000/ride/${ride._id}`, ride, { withCredentials: true });
  }

  cancelRide(id: string) {
    return this.httpClient.put<Ride>(`http://localhost:3000/ride/${id}/cancel`, {}, { withCredentials: true });
  }

  leaveRide(rideid: string, userid: string) {
    return this.httpClient.put<Ride>(`http://localhost:3000/ride/${rideid}/leave`, { user: userid }, { withCredentials: true });
  }
}
