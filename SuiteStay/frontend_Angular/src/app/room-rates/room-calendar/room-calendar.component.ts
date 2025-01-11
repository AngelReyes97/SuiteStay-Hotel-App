import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-room-calendar',
  standalone: true,
  imports: [CalendarModule,
            CommonModule,
            ReactiveFormsModule,],
  templateUrl: './room-calendar.component.html',
  styleUrl: './room-calendar.component.css'
})
export class RoomCalendarComponent implements OnInit{
  private reservationSubscription: Subscription | null = null;

  minDate: Date | undefined;
  maxDate: Date | undefined;
  today = new Date();

  changeDatesForm = this.fb.group({
    newrangeDates: <Date[] | null> (null),
  });

  constructor(private reservationSvc: ReservationService,
              private router: Router,
              private authSvc: AuthService,
              private fb: FormBuilder) {}

  ngOnInit(){
    const today = new Date();
    this.minDate = new Date(today);
    this.reservationSubscription = this.reservationSvc.getReservation().subscribe({
      next: (reservation) => {
        if(reservation){
          const dates: Date[] = [reservation.checkIn, reservation.checkOut];
          this.changeDatesForm.patchValue({ newrangeDates: dates });
        }
      }
    });
    this.authSvc.setPreviousUrl(this.router.url);
  }

  selectRange(value: Date){
    const newrangeDates = this.changeDatesForm.get('newrangeDates')?.value;

    if (newrangeDates && newrangeDates.length > 1){
      if(newrangeDates[0]?.getTime() === newrangeDates[1]?.getTime()){
        const nextDay = new Date(newrangeDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        newrangeDates[1] = nextDay;
        this.changeDatesForm.patchValue({newrangeDates});
      } else{
        const updatedMaxDate = new Date(newrangeDates[0]);
        updatedMaxDate.setDate(updatedMaxDate.getDate() + 14);
        this.maxDate = updatedMaxDate;
      }
      if(newrangeDates[0] !== null && newrangeDates[1]!== null)
      {
        this.reservationSvc.changeDates(newrangeDates);
      }
    }
  }

  handleClearSelection(event: Event){
    this.changeDatesForm.patchValue({ newrangeDates: null });
    this.minDate = new Date(this.today);
    this.maxDate = undefined;
  }

  ngOnDestroy() {
    if (this.reservationSubscription){
      this.reservationSubscription.unsubscribe();
    }
  }
}
