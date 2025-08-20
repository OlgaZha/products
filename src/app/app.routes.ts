import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ManagerComponent} from './components/manager/manager.component';
import {UsersComponent} from './components/users/users.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CompareUsersComponent} from './components/compare-users/compare-users.component';
import {PostsComponent} from './components/posts/posts.component';
import {SortedProductsComponent} from './components/sorted-products/sorted-products.component';
import {UsersTableComponent} from './components/users-table/users-table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'manager', component: ManagerComponent},
  { path: 'users', component: UsersComponent},
  { path: 'product/:id',
  loadComponent: () =>
    import('./components/product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
  { path: 'users/:id', component: EditUserComponent},
  {path: 'compare-users', component: CompareUsersComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'sorting', component: SortedProductsComponent}
];
