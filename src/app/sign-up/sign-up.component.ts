import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Example function that simulates a successful sign-up process
  }

  completeSignUp() {
    // Simulate some process, then navigate to a route with the navbar
    // For example, navigate back to the home page after sign-up
    this.router.navigate([ROUTER_TOKENS.HOME]);
  }

}