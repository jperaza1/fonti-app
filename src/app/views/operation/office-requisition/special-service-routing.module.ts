import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListOfficeRequisitionComponent } from './list-office-requisition/list-office-requisition.component';
import { CreateOrUpdateOfficeRequisitionComponent } from './create-or-update-office-requisition/create-or-update-office-requisition.component';



const routes: Routes = [
  { path: '', component: ListOfficeRequisitionComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreateOrUpdateOfficeRequisitionComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: CreateOrUpdateOfficeRequisitionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRequisitionRoutingModule { }