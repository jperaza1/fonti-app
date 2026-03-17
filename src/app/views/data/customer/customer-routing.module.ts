import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListCustomerComponent } from './list-customer/list-customer.component';



const routes: Routes = [
  { path: '', component: ListCustomerComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }