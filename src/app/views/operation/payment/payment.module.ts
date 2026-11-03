import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { SharedModule } from '../../shared/shared.module';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { CreateOrUpdatePaymentComponent } from './create-or-update-payment/create-or-update-payment.component';
import { PaymentRoutingModule } from './payment-routing.module';



@NgModule({
  declarations: [AddPaymentComponent, ListPaymentComponent, CreateOrUpdatePaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    PaymentRoutingModule
  ],
  exports: [
    AddPaymentComponent
  ]
})
export class PaymentModule { }
