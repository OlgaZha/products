import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/product.model';
import { ProductsService } from './services/products.service';
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent {
  title = 'Products';
  products: Array<Product> = []
  product: Product | null = null
  cardCount: number = 0
  constructor(productService: ProductsService) {
    // productService?.load(1)?.subscribe((product: Product | null)=>{
    //   debugger
    //   if(product) {
    //     this.product = product
    //   }
  // })
    productService?.loadAll()?.subscribe((products: Product[]) => {
      this.products = products;
    })
  }
  getCount() {
    this.cardCount++
  }

}
