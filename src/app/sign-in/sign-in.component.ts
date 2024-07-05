import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    NgbDropdownModule,
    ButtonModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [NgbDropdownConfig]
})
export class SignInComponent {
  email: string | undefined;
  password: string | undefined;

	constructor(config: NgbDropdownConfig) {
		// customize default values of dropdowns used by this component tree
		config.placement = 'bottom-end';
		config.autoClose = true;
	}
}
