import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent implements OnInit{

  constructor(private authSvc: AuthService, private router: Router) {}
  
  ngOnInit(): void {
      this.authSvc.setPreviousUrl(this.router.url);
  }

  scrollToTop(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll to the top
  }
}
