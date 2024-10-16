import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Rooms } from '../models/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl ='http://localhost:8080';
  cartItems = signal<Reservation[]>([]);
  sideBarVisible = signal<boolean>(false);

  subTotal = computed(() => this.cartItems().reduce((total, item) => 
    total + (item.rooms?.reduce((roomPrice, room) => roomPrice + room.room_Price, 0) || 0), 0)
  );

  constructor(private http: HttpClient) {}

  addToCart(room: Rooms, reservation: Reservation): void{
    this.cartItems.update(items => [...items, {...reservation, rooms: [room]}]);
  }

  showSideBar(): void{
    this.sideBarVisible.set(true);
  }

  hideSideBar(): void{
    this.sideBarVisible.set(false);
  }

  clearAllItems(): void{
    this.cartItems.set([]);  
  }

}