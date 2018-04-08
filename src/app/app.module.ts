import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from './cookie-service/cookie.service';
import { AddRideDialogComponent } from './home-page/add-ride-dialog/add-ride-dialog.component';
import { RidesTableComponent } from './home-page/rides-table/rides-table.component';
import { RideHttpService } from './ride/ride-http-service/ride-http.service';
import { RideService } from './home-page/rides-table/ride-service/ride.service';
import { UserRidesPageComponent } from './user-rides-page/user-rides-page.component';
import { UserHttpService } from './user/user-http-service/user-http.service';
import { UserService } from './user-rides-page/user-service/user.service';
import { UserRidesTableComponent } from './user-rides-page/user-rides-table/user-rides-table.component';
import { NotificationHttpService } from './notification/notification-http-service/notification-http.service';
import { NotificationService } from './notification-service/notification.service';

const appRoutes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'user', component: UserRidesPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RidesTableComponent,
    AddRideDialogComponent,
    UserRidesPageComponent,
    UserRidesTableComponent
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
    MatExpansionModule,
    MatListModule,
    MatButtonToggleModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RideHttpService,
    RideService,
    CookieService,
    UserHttpService,
    UserService,
    NotificationService,
    NotificationHttpService
  ],
  entryComponents: [AddRideDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
