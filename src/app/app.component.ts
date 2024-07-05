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
import { NgIf } from '@angular/common';

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
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SuiteStay';

  showNavbar: boolean = true;

  constructor(private navbarService: HideNavbarService) {}

  ngOnInit(): void {
    this.navbarService.showNavbar$.subscribe(show => this.showNavbar = show);
  }
}
