import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CityComponent } from './calendar/city/city.component';
import { GuestSelectorComponent } from './calendar/guest-selector/guest-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HideNavbarService } from './hide-navbar.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { RoomRatesComponent } from './room-rates/room-rates.component';
import { RoomCalendarComponent } from './room-rates/room-calendar/room-calendar.component';
import { RoomsComponent } from './room-rates/rooms/rooms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet,
    FormsModule,
    HomeComponent,
    NavbarComponent,
    CalendarComponent,
    CityComponent,
    GuestSelectorComponent,
    HttpClientModule,
    SignInComponent,
    SignUpComponent,
    CommonModule,
    ToastModule,
    RippleModule,
    RoomRatesComponent,
    RoomCalendarComponent,
    RoomsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent implements OnInit{
  title = 'SuiteStay';

  showNavbar: boolean = true;

  constructor(private navbarService: HideNavbarService, 
              private primengconfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengconfig.ripple = true;
    this.navbarService.showNavbar$.subscribe(show => this.showNavbar = show);
  }
}
