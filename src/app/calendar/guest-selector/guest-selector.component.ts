import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guest-selector',
  standalone: true,
  imports: [InputNumberModule, FormsModule],
  templateUrl: './guest-selector.component.html',
  styleUrl: './guest-selector.component.css'
})
export class GuestSelectorComponent {
  guestNum: number = 1;
}
