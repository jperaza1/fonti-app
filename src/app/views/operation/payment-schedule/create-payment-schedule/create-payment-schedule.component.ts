import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PaymentScheduleDetailDto, PaymentScheduleDto } from '../dtos/payment-schedule.dto';
import { PaymentScheduleService } from '../payment-schedule.service';

@Component({
  selector: 'app-create-payment-schedule',
  templateUrl: './create-payment-schedule.component.html',
  styleUrls: ['./create-payment-schedule.component.css'],
})
export class CreatePaymentScheduleComponent extends AppComponentBase implements OnInit {
  title = 'Nueva programación de pago';
  model: PaymentScheduleDto = new PaymentScheduleDto();
  errors: any = {};
  saving = false;
  previousLabel = '';

  constructor(private _paymentScheduleService: PaymentScheduleService) {
    super();
    this.model.date = new Date();
    this.model.details = [];
  }

  async ngOnInit() {
    const carry = await this._paymentScheduleService.getCarryForward();
    this.model.details = carry?.details || [];
    if (carry?.previousScheduleId) {
      const previousDate = carry.previousDate
        ? new Date(carry.previousDate).toLocaleDateString()
        : '';
      this.previousLabel = `Se trajeron los saldos sin pagar de "${carry.previousDescripcion}" (${previousDate}). El acumulado de cada línea es ese saldo.`;
    }
  }

  addLine() {
    const line = new PaymentScheduleDetailDto();
    line.vendor = '';
    line.descripcion = '';
    line.accumulatedAmount = 0;
    line.projectedAmount = 0;
    line.realAmount = 0;
    line.pendingAmount = 0;
    line.status = 1;
    line.statusName = 'Pendiente';
    line.fromPreviousSchedule = false;
    this.model.details.push(line);
  }

  removeLine(index: number) {
    const line = this.model.details[index];
    if (line.fromPreviousSchedule) {
      return;
    }
    this.model.details.splice(index, 1);
  }

  due(line: PaymentScheduleDetailDto): number {
    return Math.max(line.accumulatedAmount || 0, line.projectedAmount || 0);
  }

  async save() {
    this.saving = true;
    this.errors = {};
    const result = await this._paymentScheduleService.create(this.model);
    this.saving = false;

    if (result.success) {
      this.success('Programación de pagos', 'La programación se creó correctamente');
      window.location.href = '/payment-schedule';
      return;
    }

    this.errors = result.errors || {};
    this.error(result.title || 'Programación de pagos', result.messageResponse || 'No se pudo crear la programación');
  }
}
