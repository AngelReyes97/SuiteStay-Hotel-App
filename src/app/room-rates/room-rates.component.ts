import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { RoomCalendarComponent } from "./room-calendar/room-calendar.component";
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { RoomsComponent } from "./rooms/rooms.component";
import { CardModule } from 'primeng/card';
import { Reservation } from '../models/reservation.model';

@Component({
  selector: 'app-room-rates',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RoomCalendarComponent,
    CardModule,
    ButtonModule,
    RoomsComponent],
  templateUrl: './room-rates.component.html',
  styleUrl: './room-rates.component.css'
})
export class RoomRatesComponent implements OnInit{
  private reservationSubscription: Subscription | null = null;

  reservation: Reservation | null = null;

  constructor(public reservationSvc: ReservationService) {}

  ngOnInit() {
    this.reservationSubscription = this.reservationSvc.getReservation()
    .subscribe((reservation) =>{
      if(reservation){
        this.reservation = reservation;
      }
    });
  }

  ngOnDestroy() {
    if (this.reservationSubscription){
      this.reservationSubscription.unsubscribe();
    }
  }

}
