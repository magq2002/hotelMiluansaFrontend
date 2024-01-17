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
import { ListReservationComponent } from '../list-reservation/list-reservation.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{

  private dialog = inject(MatDialog);
  private reservationService = inject(ReservationsService);

  reservas: EventInput[] = [];

  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    events: [],
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
  ngOnInit(): void {
    this.loadReservations();
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
    const reservation = this.Openpopup(selectInfo.startStr, selectInfo.endStr);
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // if (reservation) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     reservation,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    try {
      var reservation = this.dialog.open(ListReservationComponent, {
        data: {
          id: clickInfo.event.id
        }
      });
      reservation.afterClosed().subscribe(item => {
        this.loadReservations();
      })
    } catch (error) {
      // console.log(error);
    }

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  Openpopup( start: string, end: string): boolean {
    try {
      var reservation = this.dialog.open(CreateReservationComponent, {
        data: {
          checkIn: start,
          checkOut: end,
        }
      });
      reservation.afterClosed().subscribe(item => {
        this.loadReservations();
      })
      return true;
    } catch (error) {
      return false;
    }
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservas = reservations.map((reservation) => ({
        id: reservation._id,
        title: reservation.name,
        start: reservation['checkIn'],
        end: reservation['checkOut'],
        color: this.getColorForRoom(reservation.room),
        textColor: 'black',
      }));
      this.calendarOptions.update(options => ({ ...options, events: this.reservas }));
    });
  }

  getColorForRoom(roomNumber: number): string {
    switch (roomNumber) {
      case 201:
        return '#FFC7E8';
      case 202:
        return '#FFB6B6';
      case 203:
        return '#D2D6FF';
      case 204:
        return '#b0fcb0';
      default:
        return 'gray';
    }
  }

}
