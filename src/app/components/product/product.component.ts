import { Product } from './../../models/product.model';
import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false
})
export class ProductComponent {
@Input() product: Product | null;
@Output() cartCounter = new EventEmitter;
constructor() {
  this.product = null;
}
isExpensive():boolean {
  if(this.product) {
    return this.product?.price > 100;
  }
  else {
    return false
  }
}
counterClicked() {
  this.cartCounter.emit();
  }
}
