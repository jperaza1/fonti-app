import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListInvoiceSaleComponent } from './list-invoice-sale/list-invoice-sale.component';
import { ViewInvoiceSaleComponent } from './view-invoice-sale/view-invoice-sale.component';


const routes: Routes = [
  { path: '', component: ListInvoiceSaleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'view/:id', component: ViewInvoiceSaleComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceSaleRoutingModule { } 