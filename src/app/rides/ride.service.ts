import { Injectable } from '@angular/core';
import { Ride } from './ride.model';
import { ICollection } from '../collection.interface';
import { RideHttpService } from './ride-http.service';
import { MatTableDataSource } from '@angular/material';

@Injectable()
export class RideService {
  public dataSource: MatTableDataSource<Ride> = new MatTableDataSource();
  public paginatorLength = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public search = '';
  public datePick: Date = null;

  constructor(private rideHttpService: RideHttpService) { }

  getRides() {
    const sub = this.rideHttpService.getRides(this.pageIndex,
      this.pageSize,
      this.search,
      this.datePick).subscribe((data) => {
      data.set = data.set.map((v) => {
        const departureDateWithOffset = new Date(v.departureDate);
        const creationDateWithOffset = new Date(v.creationDate);
        const actualDepartureDate = new Date(departureDateWithOffset.getTime() + departureDateWithOffset.getTimezoneOffset() * 60 * 1000);
        const actualCreationDate = new Date(creationDateWithOffset.getTime() + creationDateWithOffset.getTimezoneOffset() * 60 * 1000);
        return {...v, departureDate: actualDepartureDate, creationDate: actualCreationDate};
      });

      this.dataSource.data = data.set;
      this.paginatorLength = data.totalCount;

      sub.unsubscribe();
    });
  }
}
