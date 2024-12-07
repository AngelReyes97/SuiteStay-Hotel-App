import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { Ripple } from 'primeng/ripple';
import { RoomsService } from '../../services/rooms.service';
import { AsyncPipe } from '@angular/common';
import { Rooms } from '../../models/rooms.model';
import { CartService } from '../../services/cart.service';
import { Reservation } from '../../models/reservation.model';
import { Router } from '@angular/router';
import { ROUTER_TOKENS } from '../../app.routes';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CardModule,
            CommonModule,
            ButtonModule,
            DialogModule,
            DividerModule,
            Ripple,
            AsyncPipe,
            ImageModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  @Input() reservation: Reservation | null = null;
  visible: boolean = false;
  selectedRoom!: Rooms | null;
  dateRange: Date[] = [];
  totalPrice: number = 0;

  readonly rooms$ = this.roomSvc.Rooms$;
  cartItems = this.cartSvc.cartItems;

  constructor(private roomSvc : RoomsService, 
              private cartSvc: CartService,
              private router: Router) {}

  priceDetail(room: Rooms){
    this.visible= true;
    this.selectedRoom = room;
    this.dateRange = [];
    this.totalPrice = 0;

    if(this.reservation){
      const checkin_Date = new Date(this.reservation.checkIn);
      const checkout_Date = new Date(this.reservation.checkOut);

      let currentDate = checkin_Date;

      while(currentDate < checkout_Date){
        this.dateRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.totalPrice = this.reservation.totalNights * (45 + this.selectedRoom.room_Price);
    }  
  }

  addToCart(room: Rooms){
    if(this.reservation){
      this.cartSvc.showSideBar();
      this.cartSvc.addToCart(room, this.reservation);
    }
  }

  checkout(){
    if(this.selectedRoom && this.reservation){
      if(this.cartItems().length == 0){
        this.cartSvc.addToCart(this.selectedRoom, this.reservation);
        this.router.navigate([ROUTER_TOKENS.CHECKOUT]);
      } else{
        this.visible = false;
        this.cartSvc.showSideBar();
        this.cartSvc.addToCart(this.selectedRoom, this.reservation);
      }
    }
  }

}
