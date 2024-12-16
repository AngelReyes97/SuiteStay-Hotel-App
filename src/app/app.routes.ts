import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RoomRatesComponent } from './room-rates/room-rates.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LocationsComponent } from './locations/locations.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { AboutUsComponent } from './about-us/about-us.component';

export enum ROUTER_TOKENS {
    HOME ='suitestay/home',
    REGISTER ='suitestay/register',
    ROOM_RATES = 'suitestay/available-rooms',
    CHECKOUT = 'suitestay/booking-payment',
    LOCATIONS = 'suitestay/property-locations',
    ROOM_DETAILS = 'suitestay/room-details',
    ABOUT_US = 'suitestay/about-us'
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
    },
    {
        path: ROUTER_TOKENS.CHECKOUT,
        component: CheckoutComponent,
        title: "Suite Stay - Complete Your Booking"
    },
    {
        path: ROUTER_TOKENS.LOCATIONS,
        component: LocationsComponent,
        title: "Suite Stay - Our Locations"
    },
    {
        path: ROUTER_TOKENS.ROOM_DETAILS,
        component: RoomDetailsComponent,
        title: "Suite Stay - Explore Rooms"
    },
    {
        path: ROUTER_TOKENS.ABOUT_US,
        component: AboutUsComponent,
        title: "Suite Stay - About Us"
    }
];
