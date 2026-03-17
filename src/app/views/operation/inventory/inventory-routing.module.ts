import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { CreateOrUpdateInventoryComponent } from './create-or-update-inventory/create-or-update-inventory.component';



const routes: Routes = [
  { path: '', component: ListInventoryComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreateOrUpdateInventoryComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: CreateOrUpdateInventoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }