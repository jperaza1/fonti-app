import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [AddPaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AddPaymentComponent
  ]
})
export class PaymentModule { }
