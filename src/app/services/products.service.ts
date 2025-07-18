import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import {BehaviorSubject, Observable, of} from 'rxjs';

let products = [];
let API = 'https://fakestoreapi.com/products/'

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
private products: Product[] = [];
selectedProduct$ = new BehaviorSubject<Product|null>(null);
  constructor(private http: HttpClient) { }
  add(product: Product) { //create
    products.push(product)
  }
  load(id: number|null): Observable<Product|null> { //read
    if(id) {
      return this.http.get<Product>(API + id)
    }
    return of(null)
  }
  loadAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API);
  }
  setProducts(products: Product[]) {
    this.products = products;
  }
  getProducts() {
    return this.products;
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(API + 'categories');
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(API + '/category/' + category);
  }
  getSelectedProduct() {
    return this.selectedProduct$.asObservable();
  }
  selectProduct(product: Product|null) {
    return this.selectedProduct$.next(product);
  }
}
