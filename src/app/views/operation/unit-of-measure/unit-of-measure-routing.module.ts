import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListUnitOfMeasureComponent } from './list-unit-of-measure/list-unit-of-measure.component';

const routes: Routes = [
  {
    path: '',
    component: ListUnitOfMeasureComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitOfMeasureRoutingModule {}
