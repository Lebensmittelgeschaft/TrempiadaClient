import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Ride } from '../../ride/ride.model';
import { UserHttpService } from '../../user/user-http-service/user-http.service';
import { CookieService } from '../../cookie-service/cookie.service';
import { RideHttpService } from '../../ride/ride-http-service/ride-http.service';

@Injectable()
export class UserService {
  public dataSource: MatTableDataSource<Ride> = new MatTableDataSource();
  public paginatorLength = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public currentRide: Ride = null;
  
  constructor(private userHttpService: UserHttpService, private rideHttpService: RideHttpService, private cookieService: CookieService) { }

  getRideById(id: string) {
    id = `5ab9fab87975c413c0b002af`;
    const sub = this.rideHttpService.getRideById(id).subscribe((data) => {
      const departureDateWithOffset = new Date(data.departureDate);
      const creationDateWithOffset = new Date(data.creationDate);
      const actualDepartureDate = new Date(departureDateWithOffset.getTime() + departureDateWithOffset.getTimezoneOffset() * 60 * 1000);
      const actualCreationDate = new Date(creationDateWithOffset.getTime() + creationDateWithOffset.getTimezoneOffset() * 60 * 1000);

      data.riders = data.riders.map((e) => {
        const joinDate = new Date(e.joinDate);
        e.joinDate = new Date(joinDate.getTime() + joinDate.getTimezoneOffset() * 60 * 1000);

        return e;
      });

      this.currentRide = data;
      sub.unsubscribe();
    });
  }
  
  getRides() {
    const id = this.cookieService.getCookie('sid');
    const sub = this.userHttpService.getRides(id, this.pageIndex, this.pageSize).subscribe((data) => {
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
