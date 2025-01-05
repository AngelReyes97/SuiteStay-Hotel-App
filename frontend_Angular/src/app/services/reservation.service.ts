import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Observable, BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/suitestay';

  private reservationSubject = new BehaviorSubject<Reservation | null>(null);
  readonly reservation$ = this.reservationSubject.asObservable()

  constructor(private http: HttpClient) { }

  saveReservation(reservation: Reservation){
    this.reservationSubject.next(reservation);
  }

  getReservation(): Observable<Reservation | null>{
    return this.reservation$;
  }

  decrementGuest(){
    const resevation = this.reservationSubject.getValue();
    if(resevation && resevation.numberOfGuest > 1){
      resevation.numberOfGuest -= 1;
      this.reservationSubject.next(resevation);
    }
  }

  incrementGuest(){
    const resevation = this.reservationSubject.getValue();
    if(resevation && resevation.numberOfGuest < 4){
      resevation.numberOfGuest += 1;
      this.reservationSubject.next(resevation);
    }
  }

  changeDates(newDates: Date[]){
    const reservation = this.reservationSubject.getValue();
    if(reservation && newDates.length == 2){
      reservation.checkIn = newDates[0];
      reservation.checkOut = newDates[1];
      reservation.totalNights = (newDates[1].getTime() - newDates[0].getTime()) / (1000 * 60 * 60 * 24);
      this.reservationSubject.next(reservation);
    }
  }

  getReservationsByAccountId(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/user/${userId}/reservations`)
    .pipe(
      map((response: Reservation[]) => response || []) //makes sure to return empty array or reservations
    );
  }

  deleteReservation(reservation_id: number): Observable <Reservation>{
    return this.http.delete<Reservation>(`${this.apiUrl}/cancel-reservation/${reservation_id}`);
  }


}