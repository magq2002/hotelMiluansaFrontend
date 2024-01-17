import { Component, Inject, OnInit, inject } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../../interfaces/reservation.interface';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { EditReservationComponent } from '../edit-reservation/edit-reservation.component';


@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrl: './list-reservation.component.css'
})
export class ListReservationComponent implements OnInit {
  private reservationsService = inject (ReservationsService);
  private dialog = inject(MatDialog);

  public reservation: Reservation = {
    _id: '',
    name: '',
    adults: 0,
    children: 0,
    room: 0,
    checkIn: '',
    checkOut: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ListReservationComponent>) {
  }

  ngOnInit(): void {
    const { id: id_data } = this.data;
    this.id = id_data;
    this.reservationsService.getReservationsById(this.id).subscribe( reservation => {
      this.reservation = reservation
    });
  }

  private id: string = '';

  onEditReservation(){
    if( !this.reservation._id ) throw Error('Reservation id is required');

    const dialogRef = this.dialog.open( EditReservationComponent, {
      data: this.reservation
    });
  }

  onDeleteReservation(){

    if( !this.reservation._id ) throw Error('Reservation id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.reservation
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result:boolean) => result ),
        switchMap( () => this.reservationsService.deleteReservationById( this.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(result => {
        this.dialogRef.close();
      });
  }



}
