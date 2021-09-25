import { Product } from './../shared/models/product';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../shared/services/product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  // @Output() updateMode = new EventEmitter<boolean>();
  // updateMode: boolean = false;
  @Output() productChanged = new EventEmitter<Product>();

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  onProductDelete() {
    this.productService.deleteProduct(this.product);
  }

  onSetUpdateMode(value: Product) {
    debugger;
    this.productChanged.emit(value);
  }

}
