import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { Ripple } from 'primeng/ripple';
import { RoomsService } from '../../services/rooms.service';
import { AsyncPipe } from '@angular/common';

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
  visible: boolean = false;

  readonly rooms$ = this.roomSvc.Rooms$;

  constructor( private roomSvc : RoomsService) {}
}
