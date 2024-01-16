import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { CheckInComponent } from './pages/check-in/check-in.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { CalendarComponent } from './pages/reservations/components/calendar/calendar.component';
import { ReservationsModule } from './pages/reservations/reservations.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    HomeComponent,
    CheckInComponent,
    RoomsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReservationsModule,
    ReactiveFormsModule

  ]
})
export class DashboardModule { }
