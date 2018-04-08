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
    const sub = this.rideHttpService.getRideById(id).subscribe((data) => {
      data.departureDate = new Date(data.departureDate);
      data.creationDate = new Date(data.creationDate);
      data.riders.forEach((e) => {
        e.joinDate = new Date(e.joinDate);
      });

      this.currentRide = data;
      sub.unsubscribe();
    });
  }
  
  getUserRides() {
    const id = this.cookieService.getCookie('sid');
    const sub = this.userHttpService.getUserRides(id, this.pageIndex, this.pageSize).subscribe((data) => {
      data.set.forEach((v) => {
        v.departureDate = new Date(v.departureDate);
        v.creationDate = new Date(v.creationDate);
      });

      this.dataSource.data = data.set;
      this.paginatorLength = data.totalCount;

      sub.unsubscribe();
    });
  }

  updateRide(ride: Ride) {
    this.rideHttpService.updateRide(ride).subscribe((ride) => {
      this.currentRide = ride;
      const tempData = this.dataSource.data;
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i]._id === ride._id) {
          tempData[i] = ride;

          break;
        }
      }

      this.dataSource.data = tempData;
    });
  }

  cancelRide(id: string) {
    this.rideHttpService.cancelRide(id).subscribe(() => {
      this.currentRide = null;
      this.getUserRides();
    });
  }

  leaveRide(id: string) {
    const userid = this.cookieService.getCookie('sid');
    this.rideHttpService.leaveRide(id, userid).subscribe((ride) => {
      this.currentRide = null;
      this.getUserRides();
    });
  }
}
