import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { ListSaleComponent } from "./list-sale/list-sale.component";
import { PendingBillingReportComponent } from "./pending-billing-report/pending-billing-report.component";
import { SaleChartReportComponent } from "./sale-chart-report/sale-chart-report.component";

const routes: Routes = [
  { path: '', component: ListSaleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'pending-billing-report', component: PendingBillingReportComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'vendor-report', component: SaleChartReportComponent, canActivate: [AuthGuard], data: { kind: 'vendor', title: 'Ranking de vendedores' } },
  { path: 'product-report', component: SaleChartReportComponent, canActivate: [AuthGuard], data: { kind: 'product', title: 'Productos vendidos' } },
  { path: 'payment-type-report', component: SaleChartReportComponent, canActivate: [AuthGuard], data: { kind: 'payment', title: 'Contado y crédito' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }