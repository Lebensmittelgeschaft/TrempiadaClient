import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatInput, MatDialog } from '@angular/material';
import { Md2Datepicker } from 'md2';
import { Subscription } from 'rxjs/Subscription';
import { AddRideDialogComponent } from './add-ride-dialog/add-ride-dialog.component';
import { RideHttpService } from '../ride/ride-http-service/ride-http.service';
import { RideService } from './rides-table/ride-service/ride.service';
import { Ride } from '../ride/ride.model';
import { CookieService } from '../cookie-service/cookie.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  search = '';
  private datePickerSubscription: Subscription;

  @ViewChild(MatInput) matInput: MatInput; 
  @ViewChild(Md2Datepicker) datePicker: Md2Datepicker;

  constructor(private rideHttpService: RideHttpService,
              private rideService: RideService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.rideService.getRides();
  }

  ngOnDestroy() {
    this.datePickerSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.datePickerSubscription = this.datePicker.onOpen.subscribe(() => {
      this.updateDatepicker();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open<AddRideDialogComponent, Ride>(AddRideDialogComponent, {
      autoFocus: false,
      closeOnNavigation: true,
      minWidth: '80%',
      direction: 'rtl'
    });

    dialogRef.afterClosed().subscribe((result: Ride) => {
      this.rideService.getRides();
    });
  }

  onSearch() {
    this.rideService.search = this.search;
    this.rideService.datePick = this.datePicker.value;
    console.log(this.datePicker.value);
    this.rideService.getRides();
  }

  resetDatePick() {
    this.datePicker.value = null;
    this.rideService.datePick = null;
    this.rideService.getRides();
  }

  updateDatepicker() {
    this.datePicker.min = new Date();
    this.datePicker.startAt = this.datePicker.min;
  }
}
