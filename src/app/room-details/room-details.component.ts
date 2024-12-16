import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
        CommonModule,
        DividerModule,
        StyleClassModule,
        PanelModule,
        ButtonModule
  ],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit{

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authSvc.setPreviousUrl(this.router.url)
  }

  scrollToTop(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smoothly scroll to the top
  }
}
