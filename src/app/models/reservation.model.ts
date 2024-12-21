import { Rooms } from "./rooms.model";
import { User } from "./account.model";

export interface City {
    name: string;
    code: string;
}

export interface Reservation {
    reservation_id?: number;
    city: string;
    state: string;
    checkIn: Date;
    checkOut: Date;
    numberOfGuest: number;
    totalNights: number;
    room?: Rooms;
    user?: User,
    price?: number;
}