import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, MatSort, MatInput} from '@angular/material';
import { RideHttpService } from '../ride-http.service';
import { Ride } from '../ride.model';
import { RideService } from '../ride.service';
import { RidesPaginatorIntl } from './rides-paginator-intl';
import { User } from '../../users/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Md2DateChange, Md2Datepicker, DateLocale } from 'md2';

@Component({
  selector: 'app-rides-table',
  templateUrl: './rides-table.component.html',
  styleUrls: ['./rides-table.component.scss']
})
export class RidesTableComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['נהג', 'מקור', 'יעד', 'זמן יציאה', 'מקומות פנויים'];
  columnDefs = ['driver', 'from', 'to', 'departureDate', 'freeSpots'];
  dataSource = new MatTableDataSource<Ride>();
  search = '';
  datepick = new Date();
  paginatorPageSubscription: Subscription;
  updateDatepickerInterval;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatInput) matImput: MatInput; 
  @ViewChild(Md2Datepicker) datePicker: Md2Datepicker;

  constructor(private rideService: RideService, private rideHttpService: RideHttpService, private dateLocaleService: DateLocale) {}

  ngOnInit() {
    this.dateLocaleService.locale = 'he-IL';
    this.updateDatepickerInterval = setInterval(() => {
      this.updateDatepicker();
    }, 1000 * 60);
    this.getRides();
    this.paginatorPageSubscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.getRides();
      this.updateDataSource();
    });
  }

  ngOnDestroy() {
    this.paginatorPageSubscription.unsubscribe();
    clearInterval(this.updateDatepickerInterval);
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.updateDatepicker();
    this.paginator._intl = new RidesPaginatorIntl();
    this.paginator._intl.firstPageLabel = 'עמוד ראשון';
    this.paginator._intl.itemsPerPageLabel = 'גודל עמוד';
    this.paginator._intl.lastPageLabel = 'עמוד אחרון';
    this.paginator._intl.nextPageLabel = 'עמוד הבא';
    this.paginator._intl.previousPageLabel = 'עמוד קודם';
    this.dataSource.sortingDataAccessor = (ride: Ride, sortHeaderId: string): string | number => {
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
    
    this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  updateDataSource() {
    this.dataSource.data = this.rideService.ridesCollection.set;
    this.paginator.length = this.rideService.ridesCollection.totalCount;
  }

  updateDatepicker() {
    this.datePicker.min = new Date();
    this.datePicker.startAt = this.datePicker.min;
  }

  getRides() {
    const sub = this.rideHttpService.getRides(this.paginator.pageIndex,
      this.paginator.pageSize,
      this.search,
      this.datePicker.value).subscribe((data) => {
      data.set = data.set.map((v) => {
        const departureDateWithOffset = new Date(v.departureDate);
        const creationDateWithOffset = new Date(v.creationDate);
        const actualDepartureDate = new Date(departureDateWithOffset.getTime() + departureDateWithOffset.getTimezoneOffset() * 60 * 1000);
        const actualCreationDate = new Date(creationDateWithOffset.getTime() + creationDateWithOffset.getTimezoneOffset() * 60 * 1000);
        return {...v, departureDate: actualDepartureDate, creationDate: actualCreationDate};
      });

      this.rideService.ridesCollection = data;
      this.updateDataSource();

      sub.unsubscribe();
    });
  }

  onSearch() {
    this.getRides();
  }
}
