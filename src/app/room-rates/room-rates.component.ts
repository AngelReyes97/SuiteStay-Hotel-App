import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { RoomCalendarComponent } from "./room-calendar/room-calendar.component";

@Component({
  selector: 'app-room-rates',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            RoomCalendarComponent],
  templateUrl: './room-rates.component.html',
  styleUrl: './room-rates.component.css'
})
export class RoomRatesComponent implements OnInit{

  constructor(public reservationSvc: ReservationService) {}

  ngOnInit() {
    console.log("in init");
  }
}
