import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    NgbDropdownModule,
    ButtonModule,
    RouterLink,
    DialogModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [NgbDropdownConfig]
})
export class SignInComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  email: string | undefined;
  password: string | undefined;

  visible: boolean = false;

	constructor() {
	}

  restInput(){
    this.email = '';
    this.password ='';
  }
}
