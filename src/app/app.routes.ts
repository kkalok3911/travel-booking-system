import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './Features/home/home.component';

export const routes: Routes = [
    {
        path:'',
        component:MainLayoutComponent,
        children:[
            {
                path:'',
                 pathMatch: 'full',
                loadComponent:() =>{
                   return import('./Features/home/home.component').then(m=>m.HomeComponent)
                }
            },

            {
                path:'bus',
                children:[
                    {
                        path:'',
                        pathMatch:'full',
                        loadComponent:() =>{
                            return import('./Features/bus/bus.component').then(m=>m.BusComponent)
                        }
                    },
                    {
                        path:'results',
                        loadComponent:() =>{
                            return import('./Features/bus/bus-list/bus-list.component').then(m=>m.BusListComponent)
                        }
                    }
                ]
            },
        
            {
                path:'train',
                loadComponent:()=>{
                    return import('./Features/train/train.component').then(m=>m.TrainComponent)
                }
            },

            {
                path:'flight',
                loadComponent:() =>{
                    return import('./Features/flight/flight.component').then(m=>m.FlightComponent)
                }
            },

            {
                path:'hotel',
                loadComponent:()=>{
                    return import('./Features/hotel/hotel.component').then(m=>m.HotelComponent)
                }
            }
        ]
    }
];
