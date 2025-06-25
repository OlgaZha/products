import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import {RxjsOperatorsUtilsService} from '../../services/rxjs-operators-utils.service';
import {FormControl} from '@angular/forms';
import {map, Observable} from 'rxjs';
import {User} from '../../models/user.model';

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
  categories$!: Observable<any[]>;
  constructor(private _rxjsService: RxjsOperatorsUtilsService) {
  }
  ngOnInit() {
    // this._rxjsService.getProductsNames();
    // this._rxjsService.loadProductsWithSimultaniuosly(1,2,3);
    // this._rxjsService.getThreeProductsAllResults(1,2,3);
    // this._rxjsService.loadProductsOneByOne(1,2,3);
    this._rxjsService.loadAllWithPriceMoreThan100()
    this._rxjsService.loadFirstNProduct(6)
    this._rxjsService.loadCategories(this.categoryControl);
    this._rxjsService.getAllDataAtOnce()
  }
  getCounterValue() {
    this.cartCounter.emit();
  }

}
