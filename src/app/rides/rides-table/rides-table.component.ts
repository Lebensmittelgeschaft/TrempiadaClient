import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource, PageEvent} from '@angular/material';
import { RideHttpService } from '../ride-http.service';
import { Ride } from '../ride.model';
import { RideService } from '../ride.service';
import { RidesPaginatorIntl } from './rides-paginator-intl.model';

@Component({
  selector: 'app-rides-table',
  templateUrl: './rides-table.component.html',
  styleUrls: ['./rides-table.component.scss']
})
export class RidesTableComponent implements OnInit, AfterViewInit {

  displayedColumns = ['נהג', 'מקור', 'יעד', 'זמן יציאה', 'מקומות פנויים'];
  dataSource = new MatTableDataSource<Ride>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rideService: RideService, private rideHttpService: RideHttpService) {}

  ngOnInit() {
    this.getRides();
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      // this.getRides(pageEvent.pageIndex, pageEvent.pageSize);
      this.getRides();
      this.updateTable();
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
    this.dataSource.paginator = this.paginator;
  }

  updateTable() {
    this.dataSource.data = this.rideService.ridesCollection.set;
    this.paginator.length = this.rideService.ridesCollection.totalCount;
  }

  getRides(page?: number, size?: number) {
    this.rideHttpService.getRides(page, size).subscribe((data) => {
      this.rideService.ridesCollection = data;
      this.updateTable();
    });
  }
}
