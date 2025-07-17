import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../models/product.model';
import {min} from 'rxjs';

@Pipe({
  name: 'filterByPricePipe',
  standalone: false
})

export class FilterByPricePipe implements PipeTransform {
  transform(products: Product[], minPrice: number, maxPrice: number): Product[] {
    return products.filter(product => {
       return (product.price >= minPrice && product.price <= maxPrice);
    });
  }
}
