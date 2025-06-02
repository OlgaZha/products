import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ManagerComponent} from './components/manager/manager.component';
import {UsersComponent} from './components/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'users', component: UsersComponent},
  { path: 'product/:id',
  loadComponent: () =>
    import('./components/product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
];
