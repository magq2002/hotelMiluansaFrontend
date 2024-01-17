import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reservation } from '../../interfaces/reservation.interface';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css'
})
export class CreateReservationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<CreateReservationComponent>) {}

  ngOnInit(): void {
      this.checkIn = this.data.checkIn;
      this.checkOut = this.data.checkOut;
  }

  private checkIn: string = '';
  private checkOut: string = '';

  private reservationsService = inject(ReservationsService);
  private snackbar = inject(MatSnackBar);


  public reservationForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    adults: new FormControl(0),
    children: new FormControl(0),
    room: new FormControl(0),
  });

  public rooms = [
    { id: 201, desc: 'Doble', color: '#FFC7E8'},
    { id: 202, desc: 'Familiar', color: '#FFB6B6' },
    { id: 203, desc: 'Cuadruple', color: '#D2D6FF' },
    { id: 204, desc: 'Triple', color: '#b0fcb0' },

  ];

  get currentReservation(): Reservation {
    const reservation = this.reservationForm.value as Reservation;
    reservation.checkIn = this.checkIn;
    reservation.checkOut = this.checkOut
    return reservation;
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', { duration: 2500})
  }

  onSubmit(){
    this.reservationsService.addReservation ( this.currentReservation )
      .subscribe( reservation => {

        this.showSnackbar(`${ reservation.name } created!`);
        this.dialogRef.close();
      });
      return;
  }
}
