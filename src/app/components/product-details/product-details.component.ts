import { Component } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../../models/product.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product$!: Observable<Product|null>;
  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.product$ = this.productsService.load(id);
    this.product$ = this.productsService.getSelectedProduct();
  }
}
