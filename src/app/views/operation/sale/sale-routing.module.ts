import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { ListSaleComponent } from "./list-sale/list-sale.component";
import { PendingBillingReportComponent } from "./pending-billing-report/pending-billing-report.component";

const routes: Routes = [
  { path: '', component: ListSaleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'pending-billing-report', component: PendingBillingReportComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }