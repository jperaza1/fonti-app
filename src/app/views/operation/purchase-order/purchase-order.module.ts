import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrUpdatePurchaseOrderComponent } from './create-or-update-purchase-order/create-or-update-purchase-order.component';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';
import { SharedModule } from '../../shared/shared.module';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { ListPurchaseOrderInvoicesComponent } from './list-purchase-order-invoices/list-purchase-order-invoices.component';
import { CreateOrUpdatePoInvoicesComponent } from './create-or-update-po-invoices/create-or-update-po-invoices.component';
import { MainPipe } from '../../../pipes/main-pipe.module';
import { ReportPurchaseOrderComponent } from './report-purchase-order/report-purchase-order.component';
import { ReportExpenseComponent } from './report-expense/report-expense.component';



@NgModule({
  declarations: [CreateOrUpdatePurchaseOrderComponent, ListPurchaseOrderComponent, ListPurchaseOrderInvoicesComponent, CreateOrUpdatePoInvoicesComponent, ReportPurchaseOrderComponent, ReportExpenseComponent],
  imports: [
    CommonModule,
    SharedModule,
    PurchaseOrderRoutingModule
  ]
})
export class PurchaseOrderModule { }
