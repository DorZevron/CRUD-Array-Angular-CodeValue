import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { FormMode } from '../enums/form.mode.enum';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private _product: Product[] = [
    {
      id: Math.ceil(Math.random() * 100),
      name: 'Coffee',
      description: 'Tasty coffee',
      price: 12,
      image: '../../../assets/images/espresso-coffee.jpg',
    },
    {
      id: Math.ceil(Math.random() * 100),
      name: 'Chocolate',
      description: 'Tasty Chocolate',
      price: 14,
      image: '../../../assets/images/chocolate.jpg',
    },
    {
      id: Math.ceil(Math.random() * 100),
      name: 'Sugar',
      description: 'Tasty Sugar',
      price: 5,
      image: '../../../assets/images/sugar.jpg',
    },
  ];

  private $product: BehaviorSubject<Product[]> = new BehaviorSubject(this._product);
  private $productFormSub= new Subject<{isToDisplayForm:boolean, formMode: FormMode, product ?: Product}>();

  constructor() { }

  onChangeProductForm(){
    return this.$productFormSub.asObservable();
  }

  openProductForm(isToDisplayForm:boolean, formMode: FormMode, product ?: Product){
    this.$productFormSub.next({isToDisplayForm:isToDisplayForm,formMode:formMode,product:product});
  }

  getAllProduct(): Observable<Product[]> {
    return this.$product.asObservable();
  }

  addProduct(product: Product) {
    this._product.push(product);
    this.notifyChanges();
  }

  updateProduct(id: number, product: Product) {
    //this._product[id] = product;
    let index = this._product.findIndex(product => product.id === id);
    if(index >= 0){
      this._product[index] = product;
      this.notifyChanges();
    }
  }

  deleteProduct(product: Product) {
    const index = this._product.indexOf(product);
    if (index > -1) {
      delete this._product[index];
    }
    this.notifyChanges();
  }

  private notifyChanges() {
    this.$product.next(this._product);
  }


}
