import {Component, Input} from '@angular/core';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  standalone: false
})
export class ProductCardComponent {
  @Input() product!: Product;
}
