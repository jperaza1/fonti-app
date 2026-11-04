import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { PaymentScheduleRoutingModule } from './payment-schedule-routing.module';
import { ListPaymentScheduleComponent } from './list-payment-schedule/list-payment-schedule.component';
import { CreatePaymentScheduleComponent } from './create-payment-schedule/create-payment-schedule.component';
import { ViewPaymentScheduleComponent } from './view-payment-schedule/view-payment-schedule.component';

@NgModule({
  declarations: [
    ListPaymentScheduleComponent,
    CreatePaymentScheduleComponent,
    ViewPaymentScheduleComponent,
  ],
  imports: [CommonModule, SharedModule, PaymentScheduleRoutingModule],
})
export class PaymentScheduleModule {}
