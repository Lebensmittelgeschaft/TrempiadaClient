import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule, MatTableModule, MatPaginatorModule } from '@angular/material';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RidesTableComponent } from './rides/rides-table/rides-table.component';
import { FormsModule } from '@angular/forms';
import { RideItemComponent } from './rides/ride-item/ride-item.component';
import { RideHttpService } from './rides/ride-http.service';
import { RideService } from './rides/ride.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RidesTableComponent,
    RideItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [RideHttpService, RideService],
  bootstrap: [AppComponent]
})
export class AppModule { }
