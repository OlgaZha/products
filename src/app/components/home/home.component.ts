import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit{
  title = 'Products';
  products: Array<Product> = []
  product: Product | null = null
  cardCount: number = 0
  constructor(private productService: ProductsService, private router: Router) {

  }
  getCount() {
    this.cardCount++
  }
  ngOnInit(): void {
    this.productService?.loadAll()?.subscribe((products: Product[]) => {
      this.products = products;
      this.productService.setProducts(products); // put to service products from API
    })
  }
  goToManage() {
    this.router.navigate(['/manager']);
  }

}
