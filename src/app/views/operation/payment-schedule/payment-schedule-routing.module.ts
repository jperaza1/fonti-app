import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListPaymentScheduleComponent } from './list-payment-schedule/list-payment-schedule.component';
import { CreatePaymentScheduleComponent } from './create-payment-schedule/create-payment-schedule.component';
import { ViewPaymentScheduleComponent } from './view-payment-schedule/view-payment-schedule.component';

const routes: Routes = [
  { path: '', component: ListPaymentScheduleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreatePaymentScheduleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'view/:id', component: ViewPaymentScheduleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentScheduleRoutingModule {}
