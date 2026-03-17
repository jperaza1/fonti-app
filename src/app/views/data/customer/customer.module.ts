import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { CreateOrUpdateCustomerComponent } from './create-or-update-customer/create-or-update-customer.component';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
  declarations: [ListCustomerComponent, CreateOrUpdateCustomerComponent],
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
