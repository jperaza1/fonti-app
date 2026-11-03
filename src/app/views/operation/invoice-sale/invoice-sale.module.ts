import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInvoiceSaleComponent } from './list-invoice-sale/list-invoice-sale.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoiceSaleRoutingModule } from './invoice-routing.module';
import { ViewInvoiceSaleComponent } from './view-invoice-sale/view-invoice-sale.component';
import { SaleModule } from '../sale/sale.module';



@NgModule({
  declarations: [ListInvoiceSaleComponent, ViewInvoiceSaleComponent],
  imports: [
    CommonModule,
    SharedModule,
    InvoiceSaleRoutingModule,
    SaleModule
  ]
})
export class InvoiceSaleModule { }
