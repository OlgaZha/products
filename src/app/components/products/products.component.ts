import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: false
})

export class ProductsComponent {
  @Input() myProducts: Product[] = [];
  @Output() cartCounter = new EventEmitter
  getCounterValue() {
    this.cartCounter.emit();
  }
}
