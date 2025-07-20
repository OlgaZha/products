import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Product} from '../../models/product.model';
import {combineLatest, map, Observable} from 'rxjs';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-sorted-products',
  templateUrl: './sorted-products.component.html',
  styleUrl: './sorted-products.component.scss',
  standalone: false
})
export class SortedProductsComponent implements OnInit {
  sortedProducts$!: Observable<Product[]>;
  constructor(private _userService: UserService, private _productsService: ProductsService ) {
  }
  ngOnInit() {
    const products$ = this._productsService.loadAll();
    const sortType$ = this._userService.sortType$

    this.sortedProducts$ = combineLatest([
      products$,
      sortType$
    ]).pipe(
      map(([products, sortType]) => {
        if (sortType==='price') {
          return [...products].sort((a,b)=> a.price - b.price);
        } else {
          return [...products].sort((a,b) => {
            const productA = a.title?.toLowerCase() || '';
            const productB = b.title?.toLowerCase() || '';
              return productA.localeCompare(productB);
          })
        }
      })
    )
  }

  sortBy(type: 'price' | 'name') {
    this._userService.setSortType(type);
  }
}
