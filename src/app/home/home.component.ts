import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { CityComponent } from '../calendar/city/city.component';
import { GuestSelectorComponent } from '../calendar/guest-selector/guest-selector.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CalendarComponent, 
    CityComponent, 
    GuestSelectorComponent,
    ButtonModule,
    DividerModule,
    HomeCarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
