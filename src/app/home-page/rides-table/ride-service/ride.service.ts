import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RideHttpService } from '../../../ride/ride-http-service/ride-http.service';
import { Ride } from '../../../ride/ride.model';

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
        data.set.forEach((v) => {
          v.departureDate = new Date(v.departureDate);
          v.creationDate = new Date(v.creationDate);
        });
        
        this.dataSource.data = data.set;
        this.paginatorLength = data.totalCount;
        sub.unsubscribe();
    });
  }
}
