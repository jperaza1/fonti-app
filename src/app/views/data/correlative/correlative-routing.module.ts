import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListCorrelativeComponent } from './list-correlative/list-correlative.component';

const routes: Routes = [
  {
    path: '',
    component: ListCorrelativeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrelativeRoutingModule {}
