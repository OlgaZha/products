import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';

import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule {}