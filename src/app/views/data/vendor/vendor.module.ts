import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ListVendorComponent } from './list-vendor/list-vendor.component';
import { CreateOrUpdateVendorComponent } from './create-or-update-vendor/create-or-update-vendor.component';
import { VendorRoutingModule } from './vendor-routing.module';



@NgModule({
  declarations: [ListVendorComponent, CreateOrUpdateVendorComponent],
  imports: [
    CommonModule,
    SharedModule,
    VendorRoutingModule
  ],
  exports: [CreateOrUpdateVendorComponent]
})
export class VendorModule { }
