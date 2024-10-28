import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CityComponent } from '../calendar/city/city.component';
import { GuestSelectorComponent } from '../calendar/guest-selector/guest-selector.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { City, Reservation } from '../models/reservation.model';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import { CommonModule } from '@angular/common';
import { dateValidator } from './datevalidator.directive';
import { Router } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CalendarComponent, 
    CityComponent, 
    GuestSelectorComponent,
    ButtonModule,
    DividerModule,
    HomeCarouselComponent,
    SignInComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit{

  city_Error: boolean = false;
  calendar_Error: boolean = false;
  readonly ROUTER_TOKENS = ROUTER_TOKENS;

  guestReservation = this.fb.group({
    selectedCity: [null as City | null, Validators.required],
    rangeDates: <Date[] | null> null,
    numberOfGuest: 1,
  }, {
    validators: [dateValidator]
  
  });

  constructor(private fb: FormBuilder, 
              private reservationSvc: ReservationService,
              private router: Router) {}

  ngOnInit(){
    this.guestReservation.get('selectedCity')?.valueChanges.subscribe();
    this.guestReservation.get('rangeDates')?.valueChanges.subscribe();
    this.guestReservation.get('numberOfGuest')?.valueChanges.subscribe();

  }

  onSubmitReservation(){
    const dates = this.guestReservation.get('rangeDates')?.value;

    if(this.guestReservation.valid && dates && dates[1] !== null){
      const reservation: Reservation = {
        city: this.guestReservation.get('selectedCity')?.value?.name.split(',')[0]!,
        state: this.guestReservation.get('selectedCity')?.value?.code!,
        checkIn: dates[0],
        checkOut: dates[1],
        numberOfGuest: this.guestReservation.get('numberOfGuest')?.value!,
        totalNights: (dates[1].getTime() - dates[0].getTime()) / (1000 * 60 * 60 * 24)
      }
      this.reservationSvc.saveReservation(reservation);
      this.router.navigate([ROUTER_TOKENS.ROOM_RATES]);

    } else if (this.guestReservation.errors?.['dateRangeInvalid'] && this.guestReservation.controls['selectedCity'].errors?.['required']){
      this.city_Error = true;
      this.calendar_Error = true;
    } else if(this.guestReservation.controls['selectedCity'].errors?.['required']){
      this.city_Error = true;
    } else if(this.guestReservation.errors?.['dateRangeInvalid']){
      this.calendar_Error = true;
    }
  }

}
