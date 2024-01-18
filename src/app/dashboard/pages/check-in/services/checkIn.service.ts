import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../../../environments/environments';
import { CheckIn } from '../interfaces/checkIn.interfaces';


@Injectable({providedIn: 'root'})
export class CheckInService {

  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient) { }


  getcheckIn():Observable<CheckIn[]>{
    return this.http.get<CheckIn[]>(`${this.baseUrl}/check-in`);
  }

  getcheckInById( id:string ):Observable<CheckIn>{
    return this.http.get<CheckIn>(`${this.baseUrl}/check-in/${ id }`)
    .pipe(
      catchError( error => of(error))
    )
  }

  // getSuggestions ( query: string ):Observable<Reservation[]>{
  //   return this.http.get<Reservation[]>(`${this.baseUrl}/reservation?q=${query}&limit=6`)
  // }

  addCheckIn( checkIn: CheckIn ): Observable<CheckIn> {
    return this.http.post<CheckIn>(`${ this.baseUrl }/check-in`, checkIn );
  }

  updateReservation( id: string, checkIn: CheckIn ): Observable<CheckIn> {
    return this.http.patch<CheckIn>(`${ this.baseUrl }/check-in/${ id }`, checkIn );
  }

  deleteCheckInById( id: string ): Observable<boolean> {
    return this.http.delete<CheckIn>(`${ this.baseUrl }/check-in/${ id }`)
    .pipe(
      map( resp => true ),
      catchError( err => of(false) ),
    );
  }


}
