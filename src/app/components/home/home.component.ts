import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {Router} from '@angular/router';
import {LoggerService} from '../../services/logger.service';

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
  constructor(private productService: ProductsService, private router: Router, private _loggerService: LoggerService) {
  }
  get getLogs(): string[] {
    return this._loggerService.logs
  }
  getCount() {
    this.cardCount++;
    this._loggerService.logs.push(`User added ${this.cardCount} products`);
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
  goToUsers() {
    this.router.navigate(['/users']);
  }
  goToPosts() {
    this.router.navigate(['/posts']);
  }
}
