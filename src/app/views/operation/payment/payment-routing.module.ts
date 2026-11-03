import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { CreateOrUpdatePaymentComponent } from './create-or-update-payment/create-or-update-payment.component';


const routes: Routes = [
  { path: '', component: ListPaymentComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'update/:id', component: CreateOrUpdatePaymentComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreateOrUpdatePaymentComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { } 