import { Rooms } from "./rooms.model";

export interface City {
    name: string;
    code: string;
}

export interface Reservation {
    reservationId?: number;
    city: string;
    state: string;
    checkIn: Date;
    checkOut: Date;
    numberOfGuest: number;
    totalNights: number;
    rooms?: Rooms[];
    userId?: number;
    roomId?: number;
    price?: number;
}