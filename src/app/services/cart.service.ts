import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Rooms } from '../models/rooms.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl ='http://localhost:8080';
  cartItems = signal<Reservation[]>([]);
  sideBarVisible = signal<boolean>(false);
  reservationId = signal<number>(1);

  subTotal = computed(() => this.cartItems().reduce((total, item) => 
    total + item.totalNights * ((item.room?.room_Price ?? 0) + 45 || 0), 0)
  );

  // resortFee = computed(() => this.cartItems().reduce((total, reservation) =>
  // total + reservation.totalNights * 45, 0))

  // tax = computed(() => this.cartItems().reduce((total, reservation) =>
  // total + reservation.totalNights * (reservation.rooms?.reduce((tax, room) => room.room_Price * tax / 100, 10.75) || 0), 0));

  grandTotal = computed(()=> this.cartItems().reduce((total, item) =>
  total + (item.price ?? 0), 0));
  
  constructor(private http: HttpClient) {}

  addToCart(room: Rooms, reservation: Reservation): void{
    const roomTotal = this.getRoomTotal(room, reservation);
    this.cartItems.update(items => [{...reservation, reservationId: this.reservationId(), price: roomTotal, room: room}, ...items]);
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

  finalizeBooking(reservation: Reservation[]) : Observable<Reservation[]>{
    const headers = { headers: {'Content-Type': 'application/json'}};
    return this.http.post<Reservation[]>(`${this.apiUrl}/suitestay/booking-payment`, reservation, headers);
  }

  getRoomTotal(room: Rooms, reservation: Reservation): number{
    const roomPrice = room.room_Price;
    const nightlyRate = roomPrice + 45;
    const taxRate = 10.75 / 100;
    const totalNights = reservation.totalNights;
    const roomTotal = nightlyRate * totalNights + (roomPrice * taxRate * totalNights);
    // The multiplication by 100 and division by 100 ensures the number 
    //is truncated to two decimal places, while the Math.floor() 
    //ensures it doesn't round up.
    return Math.round(roomTotal * 100)/100; 
  }

}