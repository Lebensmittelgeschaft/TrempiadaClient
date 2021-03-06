import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Md2Datepicker } from 'md2';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { User } from '../../user/user.model';
import { CookieService } from '../../cookie-service/cookie.service';
import { Ride } from '../../ride/ride.model';
import { RideService } from '../rides-table/ride-service/ride.service';
import { RideHttpService } from '../../ride/ride-http-service/ride-http.service';

@Component({
  selector: 'app-add-ride-dialog',
  templateUrl: './add-ride-dialog.component.html',
  styleUrls: ['./add-ride-dialog.component.scss']
})
export class AddRideDialogComponent implements AfterViewInit {
  private datePickerSubscription: Subscription;
  @ViewChild(Md2Datepicker) datePicker: Md2Datepicker;

  constructor(public dialogRef: MatDialogRef<AddRideDialogComponent, Ride>,
              @Inject(MAT_DIALOG_DATA) public data: Ride,
              private rideService: RideService,
              private rideHttpService: RideHttpService,
              private cookieService: CookieService,
              private snackBar: MatSnackBar) { }

  onNoClick() {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.datePickerSubscription = this.datePicker.onOpen.subscribe(() => {
      const dialogDatePicker = document.getElementById('cdk-overlay-0');

      // If the dialog's datepicker is not where it should be.
      if (dialogDatePicker && dialogDatePicker.firstChild === null) {
        const cdkOverlayPanes = document.getElementsByClassName('cdk-overlay-container');
        let datePickerNode: Node = null;
        for (let i = 0; i < cdkOverlayPanes[0].childNodes.length && datePickerNode === null; i++) {
          const currNode = cdkOverlayPanes[0].childNodes.item(i);
          if (currNode.firstChild && currNode.firstChild.localName === 'md2-datepicker-content') {
            datePickerNode = currNode;
          }
        }

        if (datePickerNode !== null) {
          cdkOverlayPanes[1].appendChild(datePickerNode);
        }
      }

      this.updateDatepicker();
    });
  }

  updateDatepicker() {
    this.datePicker.min = new Date();
    this.datePicker.startAt = this.datePicker.min;
  }

  canSubmitRide(form: NgForm) {
    const ride = <Ride>{
      departureDate: form.value.departureDate,
      from: form.value.from,
      to: form.value.to
    };

    return (form.valid &&
            form.value.departureDate !== undefined &&
            this.canAddRide(ride));
  }

  canAddRide(ride: Ride) {
    const userid = this.cookieService.getCookie('sid');
    const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
    const MAX_RIDES_PER_DAY = 4;
    ride.departureDate.setUTCSeconds(0);

    const ridesInSameDay = this.rideService.dataSource.data.filter((r) => {
      return (r.departureDate.getTime() > ride.departureDate.getTime() - DAY_IN_MILLISECONDS / 2 &&
              r.departureDate.getTime() < ride.departureDate.getTime() + DAY_IN_MILLISECONDS / 2 &&
              ((<User>r.driver)._id === userid ||
              (<string[]>r.riders.map(v => v.rider)).indexOf(userid) !== -1));
    });

    return (ridesInSameDay.length < MAX_RIDES_PER_DAY &&
            ride.departureDate.getTime() > Date.now() &&
            ride.from !== ride.to);
  }

  addRide(form: NgForm) {
    const rideInfo = <Ride>form.value;
    const userid = this.cookieService.getCookie('sid');
    
    if (this.canAddRide(rideInfo)) {
      rideInfo.departureDate = new Date(rideInfo.departureDate);
      rideInfo.departureDate.setUTCSeconds(0);
      rideInfo.maxRiders = +rideInfo.maxRiders;

      // TODO: Change to get driver id from session and not the client.
      rideInfo.driver = userid;
      this.rideHttpService.createRide(rideInfo).subscribe((ride) => {
        this.snackBar.open('נסיעה נוספה בהצלחה', undefined, {
          duration: 1500,
          direction: 'rtl'
        });
        this.dialogRef.close(ride);
      },
      (err) => {
        this.snackBar.open('הוספת הנסיעה נכשלה', undefined, {
          duration: 1500,
          direction: 'rtl'
        });
      });
    }
  }
}
