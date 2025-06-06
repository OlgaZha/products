import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
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
import {MessageLocalService} from './services/message-local.service';

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductComponent, HomeComponent, ManagerComponent, UsersComponent, UserComponent, MessageComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [ProductsService, MessageLocalService],
  bootstrap: [AppComponent]
})
export class AppModule {}
