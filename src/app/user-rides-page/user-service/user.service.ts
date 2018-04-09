import { Injectable } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
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
  
  constructor(private userHttpService: UserHttpService,
              private rideHttpService: RideHttpService,
              private cookieService: CookieService,
              private snackBar: MatSnackBar) { }

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
    this.rideHttpService.updateRide(ride).subscribe((updatedRide) => {
      this.currentRide = updatedRide;
      const tempData = this.dataSource.data;
      for (let i = 0; i < tempData.length; i++) {
        if (tempData[i]._id === updatedRide._id) {
          tempData[i] = updatedRide;
          this.snackBar.open('הנסיעה עודכנה בהצלחה', undefined, {
            duration: 1500,
            direction: 'rtl'
          });

          break;
        }
      }

      this.dataSource.data = tempData;
    },
    (err) => {
      this.snackBar.open('עדכון הנסיעה נכשל', undefined, {
        duration: 1500,
        direction: 'rtl'
      });
    });
  }

  cancelRide(id: string) {
    this.rideHttpService.cancelRide(id).subscribe((ride) => {
      this.currentRide = null;
      this.getUserRides();
      this.snackBar.open('הנסיעה בוטלה בהצלחה', undefined, {
        duration: 1500,
        direction: 'rtl'
      });
    },
    (err) => {
      this.snackBar.open('ביטול הנסיעה נכשל', undefined, {
        duration: 1500,
        direction: 'rtl'
      });
    });
  }

  leaveRide(id: string) {
    const userid = this.cookieService.getCookie('sid');
    this.rideHttpService.leaveRide(id, userid).subscribe((ride) => {
      this.snackBar.open('עזיבת הנסיעה הצליחה', undefined, {
        duration: 1500,
        direction: 'rtl'
      });
      this.currentRide = null;
      this.getUserRides();
    },
    (err) => {
      this.snackBar.open('עזיבת הנסיעה נכשלה', undefined, {
        duration: 1500,
        direction: 'rtl'
      });
    });
  }
}
