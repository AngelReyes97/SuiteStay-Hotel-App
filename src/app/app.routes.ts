import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RoomRatesComponent } from './room-rates/room-rates.component';

export enum ROUTER_TOKENS {
    HOME ='suitestay/home',
    REGISTER ='suitestay/register',
    ROOM_RATES = 'suitestay/available-rooms'
}

export const routes: Routes = [
    {
        path: '',
        redirectTo: ROUTER_TOKENS.HOME,
        pathMatch: 'full'
    },
    {
        path: ROUTER_TOKENS.HOME,
        component: HomeComponent,
        title: "Welcome to Suite Stay Resorts"
    },
    {
        path: ROUTER_TOKENS.REGISTER,
        component: SignUpComponent,
        title: "Join Suite Stay - Sign Up Today"
    },
    {
        path: ROUTER_TOKENS.ROOM_RATES,
        component: RoomRatesComponent,
        title: "Suite Stay - Explore Room Rates & Availability"
    }
];
