import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatInput, MatDialog } from '@angular/material';
import { Md2Datepicker } from 'md2';
import { Subscription } from 'rxjs/Subscription';
import { RideHttpService } from '../rides/ride-http.service';
import { RideService } from '../rides/ride.service';
import { AddRideDialogComponent } from './add-ride-dialog/add-ride-dialog.component';
import { Ride } from '../rides/ride.model';

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
      width: '80%',
      autoFocus: false,
      closeOnNavigation: true,
      direction: 'rtl'
    });

    dialogRef.afterClosed().subscribe((result: Ride) => {
      this.rideService.getRides();
    });
  }

  onSearch() {
    this.rideService.search = this.search;
    this.rideService.datePick = this.datePicker.value;
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
