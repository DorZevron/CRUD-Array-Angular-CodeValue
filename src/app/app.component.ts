
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormMode } from './shared/enums/form.mode.enum';
import { Product } from './shared/models/product';
import { ProductService } from './shared/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , OnDestroy{
  // title = 'CodeValue-Test';

  product: Product;
  products: Product[] = [];
  ProductMode: boolean = false;
  productsSub: Subscription;
  // updateModeProduct: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnDestroy(): void {
    if(this.productsSub)
    this.productsSub.unsubscribe();
  }

  ngOnInit() {
    debugger;
    this.productsSub = this.productService.getAllProduct().subscribe((products: Product[]) => {
      debugger;
      this.products = products;
    });

    console.log(this.products);
  }

  onNewProductMode() {
    debugger;
    this.productService.openProductForm(true,FormMode.Add);
  }

  onProductChanged(updateProduct: Product) {
    debugger;
    this.productService.openProductForm(true,FormMode.Update,updateProduct);
    // this.modalService.updateMovie(this.product.id, updateProduct);
    // this.product = updateProduct;
  }
  // onMovieChanged(id: number ,product: Product) {
  //   this.modalService.updateMovie(id,product);
  // }

}
