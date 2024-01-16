import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { Reservation } from '../interfaces/reservation.interface';


@Injectable({providedIn: 'root'})
export class ReservationsService {

  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient) { }


  getReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservation`);
  }

  getReservationsById( id:string ):Observable<Reservation | undefined>{
    return this.http.get<Reservation>(`${this.baseUrl}/reservation/${ id }`)
    .pipe(
      catchError( error => of(undefined))
    )
  }

  getSuggestions ( query: string ):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservation?q=${query}&limit=6`)
  }

  addReservation( reservation: Reservation ): Observable<Reservation> {
    console.log( reservation );
    return this.http.post<Reservation>(`${ this.baseUrl }/reservation`, reservation );
  }

  updateReservation( reservation: Reservation ): Observable<Reservation> {
    if( !reservation.id ) throw Error( 'reservation id is required' );
    return this.http.patch<Reservation>(`${ this.baseUrl }/reservation/${ reservation.id }`, reservation );
  }

  deleteReservationById( id: string ): Observable<boolean> {
    return this.http.delete<Reservation>(`${ this.baseUrl }/reservation/${ id }`)
    .pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }


}
