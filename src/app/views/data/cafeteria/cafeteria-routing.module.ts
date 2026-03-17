import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListCafeteriaComponent } from './list-cafeteria/list-cafeteria.component';



const routes: Routes = [
  { path: '', component: ListCafeteriaComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CafeteriaRoutingModule { }