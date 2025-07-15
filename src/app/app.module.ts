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

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductComponent, HomeComponent, ManagerComponent, UsersComponent, UserComponent, EditUserComponent, CompareUsersComponent, PostsComponent, PostPreviewComponent, FilterByTitlePipe, AppUserCardComponent, FilterByPricePipe],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, MessageComponent],
  providers: [ProductsService, {provide: HTTP_INTERCEPTORS, useClass: ProductsAuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
