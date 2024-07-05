import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CityComponent } from './calendar/city/city.component';
import { GuestSelectorComponent } from './calendar/guest-selector/guest-selector.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';

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
    SignInComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SuiteStay';
}
