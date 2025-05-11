import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

let products = [];
let API = 'https://fakestoreapi.com/products/'

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }
  add(product: Product) { //create
    products.push(product)
  }
  load(id: number): Observable<Product|null> { //read
    if(id) {
      debugger
      return this.http.get<Product>(API + id)
    }
    return of(null)
  }
  loadAll(): Observable<Product[]> {
    return this.http.get<Product[]>(API)
  }
}
