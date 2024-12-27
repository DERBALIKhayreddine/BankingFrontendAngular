import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/views/home/home.component';
import { ClientsComponent } from './presentation/views/clients/clients.component';
import { AccountsComponent } from './presentation/views/accounts/accounts.component';
import { StatsComponent } from './presentation/views/stats/stats.component';
import { NotfoundComponent } from './presentation/views/notfound/notfound.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        pathMatch:'full'
    },
    {
        path:'clients',
        component:ClientsComponent,
        pathMatch:'full'
    },
    {
        path:'accounts',
        component:AccountsComponent,
        pathMatch:'full'
    },
    {
        path:'stats',
        component:StatsComponent,
        pathMatch:'full'
    },
    {
        path:'**',
        component:NotfoundComponent,
        pathMatch:'full'
    },
];
