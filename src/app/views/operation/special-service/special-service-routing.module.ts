import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListSpecialServiceComponent } from './list-special-service/list-special-service.component';
import { CreateOrUpdateSpecialServiceComponent } from './create-or-update-special-service/create-or-update-special-service.component';



const routes: Routes = [
  { path: '', component: ListSpecialServiceComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreateOrUpdateSpecialServiceComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: CreateOrUpdateSpecialServiceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialServiceRoutingModule { }