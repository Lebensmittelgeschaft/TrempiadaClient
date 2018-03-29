import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatSidenavModule } from '@angular/material';


import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RidesTableComponent } from './rides-table/rides-table.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RidesTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
