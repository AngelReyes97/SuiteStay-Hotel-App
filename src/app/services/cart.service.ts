import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Rooms } from '../models/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl ='http://localhost:8080';
  cartItems = signal<Reservation[]>([]);
  sideBarVisible = signal<boolean>(false);
  reservationId = signal<number>(1);

  subTotal = computed(() => this.cartItems().reduce((total, item) => 
    total + item.totalNights * (item.rooms?.reduce((fee, room) => fee + room.room_Price, 45) || 0), 0)
  );

  resortFee = computed(() => this.cartItems().reduce((total, reservation) =>
  total + reservation.totalNights * 45, 0))

  tax = computed(() => this.cartItems(). reduce((total, reservation) =>
  total + reservation.totalNights * (reservation.rooms?.reduce((tax, room) => room.room_Price * tax / 100, 10.75) || 0), 0));

  grandTotal = computed(()=> this.subTotal() + this.tax());

  constructor(private http: HttpClient) {}

  addToCart(room: Rooms, reservation: Reservation): void{
    this.cartItems.update(items => [{...reservation, reservationId: this.reservationId(), rooms: [room]}, ...items]);
    this.reservationId.update(id => id + 1);
  }

  showSideBar(): void{
    this.sideBarVisible.set(true);
  }

  hideSideBar(): void{
    this.sideBarVisible.set(false);
  }

  clearAllItems(): void{
    this.cartItems.set([]);
    this.reservationId.set(1);
  }

  removeReservation(resId: number){
    this.cartItems.update(items =>
      items.filter(item => item.reservationId !== resId));
    this.reservationId.update(id => id - 1);
  }

}