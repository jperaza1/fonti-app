import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { WarehouseTransferRoutingModule } from './warehouse-transfer-routing.module';
import { ListWarehouseTransferComponent } from './list-warehouse-transfer/list-warehouse-transfer.component';
import { ViewWarehouseTransferComponent } from './view-warehouse-transfer/view-warehouse-transfer.component';

@NgModule({
  declarations: [
    ListWarehouseTransferComponent,
    ViewWarehouseTransferComponent,
  ],
  imports: [CommonModule, SharedModule, WarehouseTransferRoutingModule],
})
export class WarehouseTransferModule {}
