import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model';
import {ProductsService} from '../../services/products.service';
import {FormBuilder, FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import {forbiddenName} from '../../validators';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss',
  standalone: false
})
export class ManagerComponent implements OnInit {
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

  constructor(private service: ProductsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, forbiddenName('test')]],
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      features: this.fb.array([this.fb.control('', Validators.required)])
    })
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
      }
    }
  }
  deleteProduct(id: number) {
    this.products = this.products.filter(product => product.id !== id)
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
  }
}
