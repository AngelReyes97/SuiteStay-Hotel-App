import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { RoomCalendarComponent } from "./room-calendar/room-calendar.component";
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { RoomsComponent } from "./rooms/rooms.component";
import { CardModule } from 'primeng/card';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-room-rates',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    RoomCalendarComponent,
    CardModule,
    ButtonModule,
    RoomsComponent, CalendarComponent],
  templateUrl: './room-rates.component.html',
  styleUrl: './room-rates.component.css'
})
export class RoomRatesComponent implements OnInit{
  private reservationSubscription: Subscription | null = null;

  CheckIn: string | null = null;
  CheckOut: string | null = null;

  constructor(public reservationSvc: ReservationService) {}

  ngOnInit() {
    console.log("in init");
    this.reservationSubscription = this.reservationSvc.getReservation()
    .subscribe((reservation) =>{
      if(reservation){
        const checkIn = reservation.checkIn.toString().split(' ');
        this.CheckIn = `${checkIn[1]} ${checkIn[2]}, ${checkIn[3]}`;
        const checkOut = reservation.checkOut.toString().split(' ');
        this.CheckOut = `${checkOut[1]} ${checkOut[2]}, ${checkOut[3]}`;
      }
    });
  }

  ngOnDestroy() {
    if (this.reservationSubscription){
      this.reservationSubscription.unsubscribe();
    }
  }

}
