import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import {forkJoin, Observable, of} from 'rxjs';
import {User} from '../models/user.model';

let products = [];
let API = 'https://fakestoreapi.com/products/'

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
private products: Product[] = [];
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
    return this.http.get<Product[]>(API)
  }
  setProducts(products: Product[]) {
    this.products = products;
  }
  getProducts() {
    return this.products;
  }
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(API + 'categories')
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(API + '/category/' + category )
  }
}
