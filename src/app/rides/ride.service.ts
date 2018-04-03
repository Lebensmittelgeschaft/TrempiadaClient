import { Injectable } from '@angular/core';
import { Ride } from './ride.model';
import { ICollection } from '../collection.interface';

@Injectable()
export class RideService {
  public ridesCollection: ICollection<Ride> = undefined;
  constructor() { }

}
