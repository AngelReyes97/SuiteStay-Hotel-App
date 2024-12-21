import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule
  ],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css',
  providers: [ConfirmationService, ReservationService]
})
export class UserBookingsComponent implements OnInit {

  private userSubscription: Subscription | null = null;
  reservations: Reservation[] = [];
  @ViewChild('dt') dt!: Table;

  constructor(
      private reservationSvc: ReservationService, 
      private route: ActivatedRoute,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cd: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['accountId'];
    if(!userId) return
    this.userSubscription = this.reservationSvc.getReservationsByAccountId(userId)
    .subscribe(bookings => {
      // Format the dates after fetching the reservations
      this.reservations = bookings.map(reservation => ({
        ...reservation,
        checkInFormatted: this.formatDate(reservation.checkIn),
      }));
    });
  }

  formatDate(date: Date | string): string {
    const d = new Date(date); 
    const utcDate = new Date(d.getTime() + d.getTimezoneOffset() * 60000); // Offset correction in milliseconds
    // Get the day, month, and year in UTC
    const day = utcDate.getUTCDate();
    const month = utcDate.toLocaleString('en-US', { month: 'short' }); // Get the month in short form (Jan, Feb, Dec, etc.)
    const year = utcDate.getUTCFullYear();
    return `${month} ${day}, ${year}`;
  }

  deleteReservation(reservation: Reservation){
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel reservation dates for ' + this.formatDate(reservation.checkIn) + ' to ' + this.formatDate(reservation.checkOut) + '?',
      header: reservation.room?.room_Type,
      icon: 'pi pi-exclamation-triangle',
      accept: ()=> {
        this.reservationSvc.deleteReservation(reservation.reservation_id!)
        .pipe(
          switchMap( ()=>{
            //re-fetch the data for up to date reservations
            const userId = this.route.snapshot.params['accountId'];
            //returns all reservations or empty array
            return this.reservationSvc.getReservationsByAccountId(userId);
          })
        ).subscribe({
          next: (bookings) =>{
            this.reservations = bookings.map(reservation =>({
              ...reservation,
              checkInFormatted: this.formatDate(reservation.checkIn),
            }));
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Reservation has been cancelled!'
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Cancel process failed.'
            });
          }
        });
      }
    })
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

}
