import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent, MatSort} from '@angular/material';
import { RideHttpService } from '../ride-http.service';
import { Ride } from '../ride.model';
import { RideService } from '../ride.service';
import { RidesPaginatorIntl } from './rides-paginator-intl';
import { User } from '../../users/user.model';

@Component({
  selector: 'app-rides-table',
  templateUrl: './rides-table.component.html',
  styleUrls: ['./rides-table.component.scss']
})
export class RidesTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['נהג', 'מקור', 'יעד', 'זמן יציאה', 'מקומות פנויים'];
  columnDefs = ['driver', 'from', 'to', 'departureDate', 'freeSpots'];
  dataSource = new MatTableDataSource<Ride>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rideService: RideService, private rideHttpService: RideHttpService) {}

  ngOnInit() {
    this.getRides();
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.getRides(pageEvent.pageIndex, pageEvent.pageSize);
      this.updateDataSource();
    });
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
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

  getRides(page?: number, size?: number) {
    this.rideHttpService.getRides(page, size).subscribe((data) => {
      data.set = data.set.map((v) => {
        return {...v, departureDate: new Date(v.departureDate), creationDate: new Date(v.creationDate)};
      });

      this.rideService.ridesCollection = data;
      this.updateDataSource();
    });
  }
}
