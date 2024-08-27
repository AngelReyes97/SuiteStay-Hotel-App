import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-calendar',
  standalone: true,
  imports: [CalendarModule,
            CommonModule,
            ReactiveFormsModule],
  templateUrl: './room-calendar.component.html',
  styleUrl: './room-calendar.component.css'
})
export class RoomCalendarComponent implements OnInit{
  private reservationSubscription: Subscription | null = null;

  minDate: Date | undefined;
  maxDate: Date | undefined;

  changeDatesForm = new FormGroup({
    newrangeDates: new FormControl<Date[] | null>(null)
  });

  constructor(private reservationSvc: ReservationService) {}

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
  }

  selectRange(){
    const newrangeDates = this.changeDatesForm.get('newrangeDates')?.value;

    if (newrangeDates && newrangeDates.length > 1){
      if(newrangeDates[0]?.getTime() === newrangeDates[1]?.getTime()){
        const nextDay = new Date(newrangeDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        newrangeDates[1] = nextDay;
        this.changeDatesForm.patchValue({newrangeDates});
      } else{
        const updatedMaxDate = new Date(newrangeDates[0]);
        updatedMaxDate.setDate(updatedMaxDate.getDate() + 31);
        this.maxDate = updatedMaxDate;
      }
      if(newrangeDates[0] !== null && newrangeDates[1]!== null)
      {
        this.reservationSvc.changeDates(newrangeDates);
      }
    }
  }

  ngOnDestroy() {
    if (this.reservationSubscription){
      this.reservationSubscription.unsubscribe();
    }
  }
  
}
