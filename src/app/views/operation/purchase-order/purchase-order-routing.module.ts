import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListPurchaseOrderComponent } from './list-purchase-order/list-purchase-order.component';
import { CreateOrUpdatePurchaseOrderComponent } from './create-or-update-purchase-order/create-or-update-purchase-order.component';
import { ReportPurchaseOrderComponent } from './report-purchase-order/report-purchase-order.component';
import { ReportExpenseComponent } from './report-expense/report-expense.component';



const routes: Routes = [
  { path: '', component: ListPurchaseOrderComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreateOrUpdatePurchaseOrderComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: CreateOrUpdatePurchaseOrderComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportPurchaseOrderComponent, canActivate: [AuthGuard] },
  { path: 'report-expense', component: ReportExpenseComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }