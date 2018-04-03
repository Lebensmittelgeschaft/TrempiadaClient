import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Ride } from './ride.model';
import { RideService } from './ride.service';
import { ICollection } from '../collection.interface';

@Injectable()
export class RideHttpService {

  constructor(private httpClient: HttpClient, private rideService: RideService) { }

  getRides(page?: number, size?: number) {
    let params: HttpParams = null;
    if (page !== undefined && size !== undefined && page >= 0 && size >= 0) {
      params = new HttpParams().set('page', page.toString()).append('size', size.toString());
    }
    return this.httpClient.get<ICollection<Ride>>('http://localhost:3000/ride', { responseType: 'json', observe: 'body', params });
  }

  createRide(ride: Ride) {
    return this.httpClient.post<Ride>('http://localhost:3000/ride', ride);
  }
}
