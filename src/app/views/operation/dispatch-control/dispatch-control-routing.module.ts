import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListDispatchControlComponent } from './list-dispatch-control/list-dispatch-control.component';
import { CreateOrUpdateDispatchControlComponent } from './create-or-update-dispatch-control/create-or-update-dispatch-control.component';

const routes: Routes = [
  {
    path: '',
    component: ListDispatchControlComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreateOrUpdateDispatchControlComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'update/:id',
    component: CreateOrUpdateDispatchControlComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DispatchControlRoutingModule {}
