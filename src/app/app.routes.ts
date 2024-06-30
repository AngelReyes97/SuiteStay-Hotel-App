import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export enum ROUTER_TOKENS {
    HOME ='home',

}

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
];
