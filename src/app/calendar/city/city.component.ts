import { Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { City } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city',
  standalone: true,
  imports: [ReactiveFormsModule,
            DropdownModule,
            CommonModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})

export class CityComponent implements OnInit {
  @Input() guestReservation!: FormGroup;
  @Input() city_Error!: boolean;
  // @Output() cityError = new EventEmitter<boolean>()
  cities: City[] | undefined;

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

  get city() {
    return this.guestReservation.controls['selectedCity'];
  }

}
