import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { MatSort, MatPaginator, Sort, PageEvent, MatExpansionPanel } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { HebrewPaginatorIntl } from '../../hebrew-paginator-intl/hebrew-paginator-intl';
import { UserService } from '../user-service/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Ride } from '../../ride/ride.model';
import { User } from '../../user/user.model';
import { NgForm } from '@angular/forms';
import { CookieService } from '../../cookie-service/cookie.service';

@Component({
  selector: 'app-user-rides-table',
  templateUrl: './user-rides-table.component.html',
  styleUrls: ['./user-rides-table.component.scss']
})
export class UserRidesTableComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {

  displayedColumns = ['נהג', 'מקור', 'יעד', 'זמן יציאה', 'מושבים פנויים'];
  columnDefs = ['driver', 'from', 'to', 'departureDate', 'freeSpots'];
  private paginatorPageSubscription: Subscription;
  private editRideMode = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private userService: UserService, private cookieService: CookieService) { }

  ngOnInit() {
    this.paginatorPageSubscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.userService.pageIndex = this.paginator.pageIndex;
      this.userService.pageSize = this.paginator.pageSize;
      this.getUserRides();
    });
  }

  ngOnDestroy() {
    this.paginatorPageSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.paginator._intl = new HebrewPaginatorIntl();
    this.paginator.showFirstLastButtons = true;
    this.userService.dataSource.sortingDataAccessor = (ride: Ride, sortHeaderId: string): string | number => {
      let data: string | number = '';
      switch (sortHeaderId) {
        case this.columnDefs[0]: {
          data = (<User>ride.driver).firstname + ' ' + (<User>ride.driver).lastname;

          break;
        }

        case this.columnDefs[1] :
        case this.columnDefs[2]: {
          data = ride[sortHeaderId];

          break;
        }

        case this.columnDefs[3]: {
          data = ride.departureDate.getTime();

          break;
        }

        case this.columnDefs[4]: {
          data = ride.maxRiders - ride.riders.length;

          break;
        }

        default: {

          break;
        }
      }

      return data;
    };
    
    this.userService.dataSource.sort = this.sort;
  }

  resetPanel(panel: MatExpansionPanel) {
    panel.close();
    this.editRideMode = false;
  }

  getRideDetails(ride: Ride) {
    if (!this.userService.currentRide || ride._id !== this.userService.currentRide._id) {
      this.userService.currentRide = null;
      this.userService.getRideById(ride._id);
    }
  }

  ngAfterContentChecked() {
    this.paginator.length = this.userService.paginatorLength;
  }

  getUserRides() {
    this.userService.getUserRides();
    this.paginator.length = this.userService.paginatorLength;
  }

  isRideDriver(rideDriver: string) {
    const userid = this.cookieService.getCookie('sid');
    return rideDriver === userid;
  }

  editRide(form: NgForm) {
    this.editRideMode = !this.editRideMode;
    form.controls.from.setValue(this.userService.currentRide.from);
    form.controls.to.setValue(this.userService.currentRide.to);
    form.controls.maxRiders.setValue(this.userService.currentRide.maxRiders);
    form.controls.departureDate.setValue(this.userService.currentRide.departureDate);
    if (this.editRideMode) {
      form.controls.from.enable();
      form.controls.to.enable();
      form.controls.maxRiders.enable();
      form.controls.departureDate.enable();
    } else {
      form.controls.from.disable();
      form.controls.to.disable();
      form.controls.maxRiders.disable();
      form.controls.departureDate.disable();
    }
  }

  canSubmitRide(form: NgForm) {
    const ride = <Ride>{
      departureDate: new Date(form.value.departureDate),
      from: form.value.from,
      to: form.value.to,
      maxRiders: form.value.maxRiders
    };

    return (form.valid &&
            form.value.departureDate !== undefined &&
            this.canUpdateRide(ride));
  }

  canUpdateRide(ride: Ride) {
    const userid = this.cookieService.getCookie('sid');
    ride.departureDate.setUTCSeconds(0);

    return (ride.departureDate.getTime() > Date.now() &&
            ride.from !== ride.to &&
            this.userService.currentRide.riders.length <= ride.maxRiders);
  }

  submitRideEdit(form: NgForm) {
    const ride = <Ride>{
      _id: this.userService.currentRide._id,
      departureDate: new Date(form.value.departureDate),
      from: form.value.from,
      to: form.value.to,
      maxRiders: +form.value.maxRiders
    };

    if (this.editRideMode) {
      if (this.canSubmitRide(form)) {
        this.userService.updateRide(ride);
        this.editRide(form);
      }
    } else if (this.isRideDriver((<User>this.userService.currentRide.driver)._id)) {
        this.cancelRide(this.userService.currentRide._id);
      } else {
        this.leaveRide(this.userService.currentRide._id);
      }
  }

  cancelRide(id: string) {
    this.userService.cancelRide(id);
  }
  
  leaveRide(id: string) {
    this.userService.leaveRide(id);
  }
}
