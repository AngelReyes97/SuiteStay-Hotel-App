import { Rooms } from "./rooms.model";

export interface City {
    name: string;
    code: string;
}

export interface Reservation {
    city: string;
    state: string;
    checkIn: Date;
    checkOut: Date;
    numberOfGuest: number;
    rooms?: Rooms[];
}