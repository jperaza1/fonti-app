import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { PaymentModule } from '../payment/payment.module';
import { CreateOrUpdateInvoiceComponent } from './create-or-update-invoice/create-or-update-invoice.component';




@NgModule({
  declarations: [ListInvoiceComponent, ViewInvoiceComponent, CreateOrUpdateInvoiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    InvoiceRoutingModule,
    PaymentModule
  ]
})
export class InvoiceModule { }