import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSaleComponent } from './list-sale/list-sale.component';
import { CreateOrUpdateSaleComponent } from './create-or-update-sale/create-or-update-sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PendingBillingReportComponent } from './pending-billing-report/pending-billing-report.component';
import { SaleChartReportComponent } from './sale-chart-report/sale-chart-report.component';
import { SaleRouteQuantityReportComponent } from './sale-route-quantity-report/sale-route-quantity-report.component';
import { ConsolidateSaleComponent } from './consolidate-sale/consolidate-sale.component';



@NgModule({
  declarations: [ListSaleComponent, CreateOrUpdateSaleComponent, PendingBillingReportComponent, SaleChartReportComponent, SaleRouteQuantityReportComponent, ConsolidateSaleComponent],
  imports: [
    CommonModule,
    SharedModule,
    SaleRoutingModule
  ],
  exports: [
    CreateOrUpdateSaleComponent
  ]
})
export class SaleModule { }
