import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css'
})
export class UserBookingsComponent implements OnInit {

  private userSubscription: Subscription | null = null;
  reservations: Reservation[] = [];

  constructor(private reservationSvc: ReservationService, 
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['accountId'];
    if(!userId) return
    this.userSubscription = this.reservationSvc.getReservationsByAccountId(userId)
    .subscribe(bookings => {
      this.reservations = bookings;
    })
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

}
