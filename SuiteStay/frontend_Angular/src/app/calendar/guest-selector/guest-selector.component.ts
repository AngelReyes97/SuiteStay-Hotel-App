import { Component, Input } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest-selector',
  standalone: true,
  imports: [InputNumberModule,
            ReactiveFormsModule],
  templateUrl: './guest-selector.component.html',
  styleUrl: './guest-selector.component.css'
})
export class GuestSelectorComponent {
  @Input() guestReservation!: FormGroup;
}
