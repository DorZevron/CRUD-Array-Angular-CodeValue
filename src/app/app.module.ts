
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './shared/services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
