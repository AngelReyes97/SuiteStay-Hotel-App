import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HideNavbarService } from './hide-navbar.service';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CartService } from './services/cart.service';
import { ROUTER_TOKENS } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet,
    FormsModule,
    NavbarComponent,
    CommonModule,
    ToastModule,
    RippleModule,
    SidebarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent implements OnInit{
  title = 'SuiteStay';

  showNavbar: boolean = true;
  visible = this.cartSvc.sideBarVisible;
  cartItems = this.cartSvc.cartItems;
  subTotal = this.cartSvc.subTotal;

  sidebarVisible: boolean = false;

  constructor(private navbarService: HideNavbarService, 
              private primengconfig: PrimeNGConfig,
              private cartSvc: CartService,
              private router: Router) {}

  ngOnInit(): void {
    this.primengconfig.ripple = true;
    this.navbarService.showNavbar$.subscribe(show => this.showNavbar = show);
  }
  
  clearAll(){
    this.cartSvc.clearAllItems();
  }

  removeReservation(resId: number){
    this.cartSvc.removeReservation(resId);
  }

  checkout(){
    this.cartSvc.hideSideBar();
    this.router.navigate([ROUTER_TOKENS.CHECKOUT]);
  }
}
