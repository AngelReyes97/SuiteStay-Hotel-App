import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Rooms } from '../models/rooms.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CheckoutFormData } from '../models/billing.model';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl ='http://localhost:8080';

  cartItems = signal<Reservation[]>([]);
  sideBarVisible = signal<boolean>(false);
  reservationId = signal<number>(1);
  private paymentInfo = new BehaviorSubject<CheckoutFormData | null>(null);

  subTotal = computed(() => this.cartItems().reduce((total, item) => 
    total + item.totalNights * ((item.room?.room_Price ?? 0) + 45 || 0), 0)
  );

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
    this.paymentInfo.next(null);
  }

  removeReservation(resId: number){
    this.cartItems.update(items =>
      items.filter(item => item.reservationId !== resId));
    this.reservationId.update(id => id - 1);

    if((this.paymentInfo.getValue() !== null) && !this.cartItems().length){
      this.paymentInfo.next(null);
    }
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


  saveBillingInfo(data: CheckoutFormData): void{
    this.paymentInfo.next(data);
  }

  getBillingInfo(): CheckoutFormData | null{
    return this.paymentInfo.getValue();
  }

  finalizeBilling(billingInfo: CheckoutFormData) : Observable<CheckoutFormData>{
    this.paymentInfo.next(billingInfo);
    this.encryptCardDetails();
    const currentbillingInfo = this.paymentInfo.getValue();
    const headers = { headers: {'Content-Type': 'application/json'}};
    return this.http.post<CheckoutFormData>(`${this.apiUrl}/suitestay/booking-payment/billing-info`, currentbillingInfo, headers);
  }

  private encryptCardDetails(): void{
    const billingInfo = this.paymentInfo.getValue();
    //This is a hardcoded key for practice only
    // to encrypt senstive dummy data.
    const secretKey = '1234567890123456';
    if(billingInfo){
      billingInfo.paymentMethod.cardNumber = CryptoJS.AES.encrypt(billingInfo.paymentMethod.cardNumber, secretKey).toString();
      billingInfo.paymentMethod.cvv = CryptoJS.AES.encrypt(billingInfo.paymentMethod.cvv, secretKey).toString();
      this.paymentInfo.next(billingInfo);
    }

  }


}