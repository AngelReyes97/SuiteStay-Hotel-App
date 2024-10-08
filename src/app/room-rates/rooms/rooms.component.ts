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

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CardModule,
            CommonModule,
            ButtonModule,
            DialogModule,
            DividerModule,
            Ripple,
            AsyncPipe],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css',
})
export class RoomsComponent {
  @Input() checkIn: string | null = null;
  @Input() checkOut: string | null = null;
  visible: boolean = false;
  selectedRoom!: Rooms | null;
  dateRange: Date[] = [];
  totalNights: number = 0;
  totalPrice: number = 0;

  readonly rooms$ = this.roomSvc.Rooms$;

  constructor(private roomSvc : RoomsService) {}

  priceDetail(room: Rooms){
    this.visible= true;
    this.selectedRoom = room;
    this.dateRange = [];
    this.totalNights = 0;
    this.totalPrice = 0;

    if(this.checkIn && this.checkOut){
      const checkin_Date = new Date(this.checkIn);
      const checkout_Date = new Date(this.checkOut);

       // Calculate total nights
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      this.totalNights = Math.floor((checkout_Date.getTime() - checkin_Date.getTime()) / millisecondsPerDay);

      let currentDate = checkin_Date;

      while(currentDate < checkout_Date){
        this.dateRange.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      this.totalPrice = this.totalNights * (45 + this.selectedRoom.room_Price);
    }  
  }

}
