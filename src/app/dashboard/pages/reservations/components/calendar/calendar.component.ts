import { Component, signal, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { MatDialog } from '@angular/material/dialog';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { ReservationsService } from '../../services/reservations.service';
import { EventInput } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  private dialog = inject(MatDialog);
  private reservationService = inject(ReservationsService);

  reservas: EventInput[] = [];

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }


  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const reservation = this.Openpopup();
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection



    if (reservation) {
      // const eventColor = '#00FF00'; // Elige un color para el evento
      calendarApi.addEvent({
        id: createEventId(),
        reservation,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        // color: eventColor, // Asigna el color al evento
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    console.log ( events );
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }


  Openpopup(): boolean {
    try {
      var reservation = this.dialog.open(CreateReservationComponent);

      reservation.afterClosed().subscribe(item => {
        // console.log(item)
        this.loadReservations();
      })
      return true;
    } catch (error) {
      return false;
    }
  }

  loadReservations(): EventInput {

      return this.reservationService.getReservations().subscribe((reservations) => {
        reservations.forEach((reservation) => {
          this.reservas.push({
            title: `Habitación ${reservation.name}`,
            start:new Date().toISOString().replace(/T.*$/, ''),
            end: new Date().toISOString().replace(/T.*$/, ''),
            color: this.getColorForRoom(reservation.room),
          });
        });
        console.log(this.reservas);
      });
  }



  getColorForRoom(roomNumber: number): string {
    // Define colores según el número de habitación (puedes ajustar según tus necesidades)
    switch (roomNumber) {
      case 201:
        return '#FFC7E8';
      case 202:
        return '#FFB6B6';
      case 203:
        return '#D2D6FF';
      case 204:
        return '#b0fcb0';
      // Agrega más casos según sea necesario
      default:
        return 'gray';
    }
  }

}
