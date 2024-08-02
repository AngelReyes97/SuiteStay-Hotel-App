import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export enum ROUTER_TOKENS {
    HOME ='home',
    REGISTER ='register',
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
];
