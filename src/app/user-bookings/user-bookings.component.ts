import { Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; 
import { AuthService } from '../services/auth.service';
interface Person { 
  name: String, 
  age: Number, 
  profession: String, 
  mobile: String, 
  gender: String 
} 

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    TagModule
  ],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css',
  providers: [ConfirmationService, ReservationService]
})

export class UserBookingsComponent implements OnInit {
  

  private userSubscription: Subscription | null = null;
  reservations: Reservation[] = [];
  @ViewChild('dt') dt!: Table;
  today = new Date();

  constructor(
      private reservationSvc: ReservationService, 
      private route: ActivatedRoute,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private authSvc: AuthService,
      private router: Router
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
        cancellation: this.cancellationEligibility(reservation)
      }));
    });
    this.authSvc.setPreviousUrl(this.router.url);
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

  
  cancellationEligibility(reservation: Reservation): boolean{
    const date = new Date(reservation.checkIn);
    const cancellationDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    //allow to cancel 3 days prior to upcoming date
    cancellationDate.setDate(cancellationDate.getDate() - 3);
    //if cancellation dates past today's date return false on cancellation
    if(cancellationDate <= this.today){
      return false;
    }
    return true;
  }

  getSeverity(status: boolean) {
    return status ? 'success' : 'danger';
  }

  getCancelMessage(status: boolean){
    return status ? 'Available' : 'Unavailable';
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
              cancellation: this.cancellationEligibility(reservation)
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
