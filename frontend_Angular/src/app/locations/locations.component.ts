import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css'
})
export class LocationsComponent implements OnInit{

  constructor(private authSvc: AuthService, private router: Router) {}
  ngOnInit(): void {
      this.authSvc.setPreviousUrl(this.router.url)
  }

  scrollToTop(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll to the top
  }
}
