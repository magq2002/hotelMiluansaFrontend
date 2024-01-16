import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationsComponent } from './reservations.component';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReservationsComponent,
    CalendarComponent,
    CreateReservationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule,
    ReactiveFormsModule,
  ]
})
export class ReservationsModule { }
