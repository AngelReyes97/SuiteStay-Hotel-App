import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    SignInComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
