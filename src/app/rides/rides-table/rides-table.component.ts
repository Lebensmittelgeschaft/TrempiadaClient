import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, AfterContentChecked , Input } from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, MatSort, MatInput} from '@angular/material';
import { RideHttpService } from '../ride-http.service';
import { Ride } from '../ride.model';
import { RideService } from '../ride.service';
import { RidesPaginatorIntl } from './rides-paginator-intl';
import { User } from '../../users/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Md2DateChange, Md2Datepicker, DateLocale } from 'md2';
import { CookieService } from '../../cookie.service';
import { ICollection } from '../../collection.interface';

@Component({
  selector: 'app-rides-table',
  templateUrl: './rides-table.component.html',
  styleUrls: ['./rides-table.component.scss']
})
export class RidesTableComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {

  displayedColumns = ['נהג', 'מקור', 'יעד', 'זמן יציאה', 'מקומות פנויים', ''];
  columnDefs = ['driver', 'from', 'to', 'departureDate', 'freeSpots', 'join'];
  private paginatorPageSubscription: Subscription;
  private datePickerSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rideService: RideService,
              private rideHttpService: RideHttpService,
              private cookieService: CookieService) {}

  ngOnInit() {
    this.paginatorPageSubscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.rideService.pageIndex = this.paginator.pageIndex;
      this.rideService.pageSize = this.paginator.pageSize;
      this.getRides();
    });
  }

  ngOnDestroy() {
    this.paginatorPageSubscription.unsubscribe();
    this.datePickerSubscription.unsubscribe();
  }
  
  ngAfterViewInit() {
    this.paginator._intl = new RidesPaginatorIntl();
    this.paginator._intl.firstPageLabel = 'עמוד ראשון';
    this.paginator._intl.itemsPerPageLabel = 'גודל עמוד';
    this.paginator._intl.lastPageLabel = 'עמוד אחרון';
    this.paginator._intl.nextPageLabel = 'עמוד הבא';
    this.paginator._intl.previousPageLabel = 'עמוד קודם';
    this.rideService.dataSource.sortingDataAccessor = (ride: Ride, sortHeaderId: string): string | number => {
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

        }
      }

      return data;
    };
    
    this.rideService.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterContentChecked() {
    this.paginator.length = this.rideService.paginatorLength;
  }

  getRides() {
    this.rideService.getRides();
    this.paginator.length = this.rideService.paginatorLength;
  }

  canJoinRide(ride: Ride) {
    const id = this.cookieService.getCookie('sid');
    return (ride.driver !== id &&
      (<string[]>ride.riders).indexOf(id) === -1 &&
      ride.riders.length < ride.maxRiders &&
      ride.departureDate.getTime() > Date.now() &&
      !ride.isDeleted);
  }

  joinRide(ride: Ride) {
    if (this.canJoinRide(ride)) {
      this.rideHttpService.joinRide(ride._id, this.cookieService.getCookie('sid')).subscribe((newRide) => {
        for (let i = 0; i < this.rideService.dataSource.data.length; i++) {
          if (this.rideService.dataSource.data[i]._id === newRide._id) {
            const tempDataSource = [...this.rideService.dataSource.data];
            tempDataSource[i] = newRide;
            this.rideService.dataSource.data = tempDataSource;
            this.paginator._changePageSize(this.paginator.pageSize);

            break;
          }
        }
      });
    }
  }
}
