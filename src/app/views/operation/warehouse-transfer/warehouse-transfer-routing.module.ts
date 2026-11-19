import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListWarehouseTransferComponent } from './list-warehouse-transfer/list-warehouse-transfer.component';
import { ViewWarehouseTransferComponent } from './view-warehouse-transfer/view-warehouse-transfer.component';

const routes: Routes = [
  { path: '', component: ListWarehouseTransferComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'view/:id', component: ViewWarehouseTransferComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WarehouseTransferRoutingModule {}
