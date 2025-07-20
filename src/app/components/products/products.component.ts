import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import {RxjsOperatorsUtilsService} from '../../services/rxjs-operators-utils.service';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, Observable, of, switchMap} from 'rxjs';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone: false
})

export class ProductsComponent implements OnInit {
  @Input() myProducts: Product[] = [];
  @Output() cartCounter = new EventEmitter;
  products$!: Observable<Product[]>;
  categoryControl = new FormControl('');
  searchControl = new FormControl('');
  categories: string[] = [];
  maxPrice: number = 0;
  minPrice: number = 0;
  constructor(private _rxjsService: RxjsOperatorsUtilsService, private _productsService: ProductsService) {
  }
  ngOnInit() {
    // this._rxjsService.getProductsNames();
    // this._rxjsService.loadProductsWithSimultaniuosly(1,2,3);
    // this._rxjsService.getThreeProductsAllResults(1,2,3);
    // this._rxjsService.loadProductsOneByOne(1,2,3);
    // this._rxjsService.loadAllWithPriceMoreThan100()
    // this._rxjsService.loadFirstNProduct(6)
    // this._rxjsService.loadCategories(this.categoryControl);
    // this._rxjsService.getAllDataAtOnce()
    this._productsService.getCategories().subscribe(categories => {this.categories = categories});
    this.onCategoryControlValueChanged()
    this.products$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchValue) =>
        this.searchProductByCategoryValue(searchValue))
    )
  }
  getCounterValue() {
    this.cartCounter.emit();
  }

  onCategoryControlValueChanged() {
    this.categoryControl.valueChanges.pipe(
      switchMap((category: string|null) => category ? this._productsService.getProductsByCategory(category) : of())
    ).subscribe(result => this.myProducts = result);
  }

  searchProductByCategoryValue(searchValue: string | null): Observable<Product[]> {
    if(searchValue) {
      return this._productsService.loadAll().pipe(
        map(products => products.filter(product => product.category?.toLowerCase().includes(searchValue.toLowerCase())))
      )
    } else {
      return of()
    }
  }

}
