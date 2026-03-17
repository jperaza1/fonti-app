import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';


const routes: Routes = [
  { path: '', component: ListInvoiceComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'view/:id', component: ViewInvoiceComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { } 