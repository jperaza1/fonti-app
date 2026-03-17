import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateOrUpdateProductComponent } from './create-or-update-product/create-or-update-product.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [ListProductComponent, CreateOrUpdateProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ]
})
export class ProductModule { }
