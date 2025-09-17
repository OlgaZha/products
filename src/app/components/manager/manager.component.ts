import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import {forbiddenName} from '../../validators';
import {LoggerService} from '../../services/logger.service';
import {CompareUsersComponent} from '../compare-users/compare-users.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectAllProducts, selectIsProductsLoading} from '../../state/products.select';
import * as ProductsActions from '../../state/products.actions';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  standalone: false
})
export class ManagerComponent implements OnInit {
  products$: Observable<Product[]>;
  isLoading$: Observable<boolean>;
  newProduct = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  }
  products : Product[] = []
  defaultId = 1;
  form: FormGroup;

  constructor(private service: ProductsService, private fb: FormBuilder, private _loggerService: LoggerService, private store: Store<{products: Product[]}>) {
    this.form = this.fb.group({
      title: ['', [Validators.required, forbiddenName('test')]],
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      features: this.fb.array([this.fb.control('', Validators.required)])
    })

    this.products$ = this.store.select(selectAllProducts);
    this.isLoading$ = this.store.select(selectIsProductsLoading);
  }

  get features(): FormArray {
    return (this.form.get('features') as FormArray)
  }

  addProduct() {
    // const product = {...this.newProduct, id: this.defaultId++};
    // this.products.push(product);   ---template-driven form

    // for reactive form
    if(this.form.valid) {
      if(this.form.controls['title'].value &&
        this.form.controls['price'].value &&
        this.form.controls['description'].value &&
        this.form.controls['image'].value &&
        this.form.controls['category'].value
      ) {
        let newProduct = {
          title: this.form.controls['title'].value,
          price: this.form.controls['price'].value,
          description: this.form.controls['description'].value,
          image: this.form.controls['image'].value,
          category: this.form.controls['category'].value,
          id: this.defaultId++
        }
        this.products.push(newProduct);
        this.form.reset();
        this._loggerService.logs.push(`User added product: ${this.newProduct.title}`);
      }
    }
  }
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id)
    this._loggerService.logs.push(`User removed product ${this.newProduct.title}`);
  }

  addFeature() {
    (this.form.get('features') as FormArray).push(this.fb.control(''))
  }

  ngOnInit(): void {
    this.products = this.service.getProducts();
    if(this.products.length === 0) {
      this.service?.loadAll()?.subscribe((products: Product[]) => {
        this.products = products;
        this.service.setProducts(products); // put to service products from API
      })
    }
    this.store.dispatch(ProductsActions.loadProducts())
  }

  protected readonly CompareUsersComponent = CompareUsersComponent;
}
