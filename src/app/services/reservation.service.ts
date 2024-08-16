import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City, Reservation } from '../models/reservation.model';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl ='http://localhost:8080';

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
      console.log("service in: ", reservation);
      this.reservationSubject.next(reservation);
    }
  }

}