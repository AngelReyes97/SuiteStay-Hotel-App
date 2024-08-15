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
    console.log(reservation);
    this.reservationSubject.next(reservation);
  }

  getReservation(): Observable<Reservation | null>{
    return this.reservation$;
  }

}