import { ProductComponent } from './components/product/product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';

import { ProductsService } from './services/products.service';
import {HomeComponent} from './components/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ManagerComponent} from './components/manager/manager.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersComponent} from './components/users/users.component';
import {UserComponent} from './components/user/user.component';
import {MessageComponent} from './components/message/message.component';
import {ProductsAuthInterceptor} from './interceptors/products-auth.interceptor';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CompareUsersComponent} from './components/compare-users/compare-users.component';
import {PostsComponent} from './components/posts/posts.component';
import {PostPreviewComponent} from './components/post-preview/post-preview.component';
import {FilterByTitlePipe} from './pipes/filter-by-title.pipe';
import {AppUserCardComponent} from './components/app-user-card/app-user-card.component';
import {FilterByPricePipe} from './pipes/filter-by-price.pipe';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {SortedProductsComponent} from './components/sorted-products/sorted-products.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {TableFilterComponent} from './components/table-filter/table-filter.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {GenericTableComponent} from './components/generic-table/generic-table.component';
import {StoreModule} from '@ngrx/store';
import {productsReducer} from './state/products.reducer';
import {ProductsEffects} from './state/products.effects';
import {EffectsModule} from '@ngrx/effects';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    ManagerComponent,
    UsersComponent,
    UserComponent,
    EditUserComponent,
    CompareUsersComponent,
    PostsComponent,
    PostPreviewComponent,
    FilterByTitlePipe,
    AppUserCardComponent,
    FilterByPricePipe,
    ProductCardComponent,
    SortedProductsComponent,
    UsersTableComponent,
    TableFilterComponent,
    GenericTableComponent
  ],
  imports: [BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageComponent,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({
      products: productsReducer
    }),
    EffectsModule.forRoot([ProductsEffects]),
  ],
  providers: [ProductsService, {provide: HTTP_INTERCEPTORS, useClass: ProductsAuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
