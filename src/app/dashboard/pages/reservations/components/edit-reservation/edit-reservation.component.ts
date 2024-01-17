import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReservationsService } from '../../services/reservations.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../../interfaces/reservation.interface';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.css'
})
export class EditReservationComponent implements OnInit {

  public reservation: Reservation = {
    _id: '',
    name: '',
    adults: 0,
    children: 0,
    room: 0,
    checkIn: '',
    checkOut: '',
  };;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<EditReservationComponent>) {}

  private reservationsService = inject(ReservationsService);
  private datePipe = inject(DatePipe);
  private snackbar = inject(MatSnackBar);


  ngOnInit(): void {
    const { _id: id_data } = this.data;
    this.id = id_data;
    this.reservationsService.getReservationsById(this.id).subscribe( reservation => {
      const { checkIn, checkOut, ...data } = reservation;

      const formattedCheckIn = checkIn ? this.datePipe.transform(checkIn, 'MM-dd-yyyy')! : '';
      const formattedCheckOut = checkOut ? this.datePipe.transform(checkOut, 'MM-dd-yyyy')! : '';

    const formattedCheckInDate = new Date(formattedCheckIn);
    const formattedCheckOutDate = new Date(formattedCheckOut);

    this.reservationForm.patchValue({
      ...data,
      checkIn: formattedCheckInDate,
      checkOut: formattedCheckOutDate
    });
    });
  }

  private id: string = '';

  public reservationForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    adults: new FormControl(0),
    children: new FormControl(0),
    room: new FormControl(0),
    checkIn: new FormControl<Date | null>(null),
    checkOut: new FormControl<Date | null>(null),
  });

  public rooms = [
    { id: 201, desc: 'Doble', color: '#FFC7E8'},
    { id: 202, desc: 'Familiar', color: '#FFB6B6' },
    { id: 203, desc: 'Cuadruple', color: '#D2D6FF' },
    { id: 204, desc: 'Triple', color: '#b0fcb0' },

  ];
  get currentReservation(): Reservation {
    const reservation = this.reservationForm.value;

    // Formatea la fecha de checkIn como string YYYY-MM-DD
    const checkInString = this.datePipe.transform(reservation.checkIn, 'yyyy-MM-dd');
    const checkOutString = this.datePipe.transform(reservation.checkOut, 'yyyy-MM-dd');

    const { checkIn, checkOut, _id, ...data } = this.reservation;
    // Crea un nuevo objeto con la fecha formateada
    const currentReservation = {
      ...data,
      checkIn: checkInString!,
      checkOut: checkOutString!
    };

    return currentReservation as Reservation;
  }

  onEditReservation(){
    if ( this.reservationForm.invalid ) return;
      this.reservationsService.updateReservation( this.id, this.currentReservation )
      .subscribe( reservation => {
        this.showSnackbar(`${ reservation.name } actualizado!`);
        this.dialogRef.close();
      });

      return;


  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', { duration: 2500})
  }

}
