import { Subscription } from 'rxjs';
import { ProductService } from './../shared/services/product.service';
import { Product } from './../shared/models/product';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormMode } from '../shared/enums/form.mode.enum';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit, OnDestroy {

  product?: Product;
  // @Input() product?: Product;
  newProductForm: FormGroup;
  productFormSub: Subscription;
  formMode: FormMode;
  isToDisplayForm: boolean;

  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnDestroy() {
    if (this.productFormSub)
      this.productFormSub.unsubscribe();
  }

  ngOnInit() {

this.createForm();

    this.productFormSub = this.productService.onChangeProductForm().subscribe(data => {
      debugger;
      this.product = data?.product;
      this.formMode = data?.formMode;
      this.isToDisplayForm = data?.isToDisplayForm;
      this.createForm();
    });
  }

  private createForm(){
    debugger;
    this.newProductForm = this.formBuilder.group({
      name: [this.product?.name ?? '', Validators.required],
      description: [this.product?.description ?? '', Validators.required],
      price: [this.product?.price ?? '', Validators.required],
      image: [this.product?.image ?? '', Validators.required],
    });
  }

  get formTitle() {
    switch (this.formMode) {
      case FormMode.Add: return 'Create New';
      case FormMode.Update: return 'Update';
    }
    return "";
  }

  onFormSubmitted() {
    // debugger;
    // let t :Product = this.newProductForm.value;
    // t.id = Math.ceil(Math.random() * 100);

    const newProduct: Product = {
      id: Math.ceil(Math.random() * 100),
      name: this.newProductForm.controls['name'].value,
      description: this.newProductForm.controls['description'].value,
      price: this.newProductForm.controls['price'].value,
      image: this.newProductForm.controls['image'].value
    }

    switch (this.formMode) {
      case FormMode.Update: {
        debugger;

        newProduct.id = this.product?.id || 0;
        this.productService.updateProduct(this.product?.id || 0, newProduct);

      } break;
      case FormMode.Add: {
        this.productService.addProduct(newProduct);

      }
        break;
    }

    this.newProductForm.reset();
  }

}
