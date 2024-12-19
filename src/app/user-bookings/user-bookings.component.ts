import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
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
  ],
  templateUrl: './user-bookings.component.html',
  styleUrl: './user-bookings.component.css',
  providers: [ConfirmationService, MessageService, ReservationService]
})
export class UserBookingsComponent implements OnInit {

  private userSubscription: Subscription | null = null;
  reservations: Reservation[] = [];
  @ViewChild('dt') dt!: Table;
  cols!: Column[];
  exportColumns!: ExportColumn[];

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
    // this.userSubscription = this.reservationSvc.getReservationsByAccountId(userId)
    // .subscribe(bookings => {
    //   this.reservations = bookings;
    // });
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

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }


}
