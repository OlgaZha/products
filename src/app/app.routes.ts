import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ManagerComponent} from './components/manager/manager.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'manager', component: ManagerComponent},
];
