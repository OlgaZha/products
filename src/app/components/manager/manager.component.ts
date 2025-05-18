import { Component } from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  standalone: false
})
export class ManagerComponent {
  newProduct = {
    title: '',
    price: 0,
    description: '',
    image: '',
    category: ''
  }
  products : Product[] = []
  defaultId = 1;
  constructor(private service: ProductsService) {
    this.products = this.service.getProducts();
  }
  addProduct() {
    const product = {...this.newProduct, id: this.defaultId++};
    this.products.push(product);
  }
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id)
  }

  protected readonly onsubmit = onsubmit;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  })
}
