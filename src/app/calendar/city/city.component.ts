import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})

export class CityComponent implements OnInit {
  cities: City[] | undefined;

  selectedCity: City | undefined;
  displaySignIn: boolean = false;

  ngOnInit() {
      this.cities = [
          { name: 'Los Angeles, LA', code: 'LA' },
          { name: 'New York, NY', code: 'NY' },
          { name: 'Las Vegas, NV', code: 'NV' },
          { name: 'Seattle, WA', code: 'WA' },
          { name: 'Miami, FL', code: 'FL' },
          { name: 'Honolulu, HI', code: 'HI' },
      ];
  }
}
