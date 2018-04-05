import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ride } from '../../rides/ride.model';
import { Md2Datepicker } from 'md2';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-ride-dialog',
  templateUrl: './add-ride-dialog.component.html',
  styleUrls: ['./add-ride-dialog.component.scss']
})
export class AddRideDialogComponent implements AfterViewInit {
  private datePickerSubscription: Subscription;
  @ViewChild(Md2Datepicker) datePicker: Md2Datepicker;

  constructor(public dialogRef: MatDialogRef<AddRideDialogComponent, Ride>,
    @Inject(MAT_DIALOG_DATA) public data: Ride) { }

  onNoClick() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.datePickerSubscription = this.datePicker.onOpen.subscribe(() => {
      this.updateDatepicker();
    });
  }

  updateDatepicker() {
    this.datePicker.min = new Date();
    this.datePicker.startAt = this.datePicker.min;
  }

  addRide(form: NgForm) {
    console.log(form);
  }
}
