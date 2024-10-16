import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/account.model';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    InputTextModule, 
    FormsModule, 
    SignInComponent,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    CommonModule,
    RouterLink,
    AvatarModule,
    MenuModule,
    RippleModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  avatarMenuItems: MenuItem[] | undefined;
  user: User | null = null;
  cartItems = this.cartSvc.cartItems;

  constructor(private authSvc: AuthService, 
              private msgSvc: MessageService,
              private cartSvc: CartService) { }

  ngOnInit() {
    this.authSvc.getUser().subscribe(user =>{
      this.user = user;
    })

    this.items = [
        {
            label: 'About Us',
            icon: 'pi pi-users'
        },
        {
            label: 'Rooms',
            icon:"custom-icon-1"
        },
        {
            label: 'Past Reservations',
            icon: 'pi pi-history',
            // routerLink: '/register'
        }
    ]

    this.avatarMenuItems = [
      {
        label:'Settings',
        icon: 'pi pi-cog',
      },
      {
        separator: true
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => this.signOut()
      }
    ]
  }

  showCart(){
    this.cartSvc.showSideBar();
  }

  signOut(){
    this.authSvc.signOut();
    this.msgSvc.add({
      severity:'success',
      summary:'All set!',
      detail: 'You’ve been signed out.'
    })
  }

}