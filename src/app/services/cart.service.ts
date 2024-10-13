import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Rooms } from '../models/rooms.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl ='http://localhost:8080';
  cartItems = signal<Rooms[]>([]);

  constructor(private http: HttpClient) {}

  addToCart(room: Rooms): void{
    this.cartItems.update(items => [...items, room]);
  }

}
