import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSaleComponent } from './list-sale/list-sale.component';
import { CreateOrUpdateSaleComponent } from './create-or-update-sale/create-or-update-sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ListSaleComponent, CreateOrUpdateSaleComponent],
  imports: [
    CommonModule,
    SharedModule,
    SaleRoutingModule
  ]
})
export class SaleModule { }
