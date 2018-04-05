import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,
         MatSidenavModule,
         MatTableModule,
         MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { Md2Module, NoConflictStyleCompatibilityMode } from 'md2';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RidesTableComponent } from './rides/rides-table/rides-table.component';
import { FormsModule } from '@angular/forms';
import { RideHttpService } from './rides/ride-http.service';
import { RideService } from './rides/ride.service';
import { CookieService } from './cookie.service';
import { AddRideDialogComponent } from './home-page/add-ride-dialog/add-ride-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RidesTableComponent,
    AddRideDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    NoConflictStyleCompatibilityMode,
    Md2Module,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [RideHttpService, RideService, CookieService],
  entryComponents: [AddRideDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
