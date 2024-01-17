import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationsComponent } from './reservations.component';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListReservationComponent } from './components/list-reservation/list-reservation.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';



@NgModule({
  providers: [DatePipe],
  declarations: [
    ReservationsComponent,
    CalendarComponent,
    CreateReservationComponent,
    ListReservationComponent,
    ConfirmDialogComponent,
    EditReservationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FullCalendarModule,
    ReactiveFormsModule,
  ]
})
export class ReservationsModule { }
