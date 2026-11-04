import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PaymentScheduleDetailDto, PaymentScheduleDto } from '../dtos/payment-schedule.dto';
import { PaymentScheduleService } from '../payment-schedule.service';

@Component({
  selector: 'app-view-payment-schedule',
  templateUrl: './view-payment-schedule.component.html',
  styleUrls: ['./view-payment-schedule.component.css'],
})
export class ViewPaymentScheduleComponent extends AppComponentBase implements OnInit {
  title = 'Programación de pago';
  model: PaymentScheduleDto = new PaymentScheduleDto();
  newLines: PaymentScheduleDetailDto[] = [];
  errors: any = {};
  savingDetailId = 0;
  savingLines = false;
  canRegisterPartial = false;

  get canEditReal(): boolean {
    return this.model?.canAddDetails === true && this.canRegisterPartial;
  }

  constructor(
    private _route: ActivatedRoute,
    private _paymentScheduleService: PaymentScheduleService,
    private _authenticationService: AuthenticationService
  ) {
    super();
    this.canRegisterPartial = this._authenticationService.IsInRole('OPERATION.PAYMENT_SCHEDULE.PARTIAL');
  }

  async ngOnInit() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    await this.load(id);
  }

  async load(id: number) {
    this.model = await this._paymentScheduleService.getById(id);
    this.title = this.model?.descripcion || 'Programación de pago';
  }

  due(line: PaymentScheduleDetailDto): number {
    return Math.max(line.accumulatedAmount || 0, line.projectedAmount || 0);
  }

  pending(line: PaymentScheduleDetailDto): number {
    return Math.max(0, this.round(this.due(line) - (line.realAmount || 0)));
  }

  previewStatus(line: PaymentScheduleDetailDto): number {
    const due = this.due(line);
    const real = this.round(line.realAmount || 0);
    if (due <= 0 || real >= due) {
      return 3;
    }
    if (real <= 0) {
      return 1;
    }
    return 2;
  }

  previewStatusName(line: PaymentScheduleDetailDto): string {
    const status = this.previewStatus(line);
    if (status == 3) {
      return 'Pagado';
    }
    if (status == 2) {
      return 'Pago Parcial';
    }
    return 'Pendiente';
  }

  statusClass(line: PaymentScheduleDetailDto): string {
    const status = this.previewStatus(line);
    if (status == 3) {
      return 'label label-success';
    }
    if (status == 2) {
      return 'label label-warning';
    }
    return 'label label-default';
  }

  private round(value: number): number {
    return Math.round((value || 0) * 100) / 100;
  }

  async register(line: PaymentScheduleDetailDto) {
    const partial = this.previewStatus(line) == 2;
    this.savingDetailId = line.id;
    const result = await this._paymentScheduleService.registerPayment({
      detailId: line.id,
      realAmount: line.realAmount || 0,
    });
    this.savingDetailId = 0;

    if (result.success) {
      this.success('Programación de pagos', partial ? 'Pago parcial registrado' : 'Pago registrado');
      await this.load(this.model.id);
      return;
    }

    this.error(result.title || 'Programación de pagos', result.messageResponse || 'No se pudo registrar el pago');
    await this.load(this.model.id);
  }

  async markPaid(line: PaymentScheduleDetailDto) {
    line.realAmount = this.due(line);
    await this.register(line);
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
    this.newLines.push(line);
  }

  removeNewLine(index: number) {
    this.newLines.splice(index, 1);
  }

  async saveLines() {
    this.savingLines = true;
    this.errors = {};
    const result = await this._paymentScheduleService.addDetails({
      paymentScheduleId: this.model.id,
      details: this.newLines,
    });
    this.savingLines = false;

    if (result.success) {
      this.newLines = [];
      this.success('Programación de pagos', 'Las líneas se agregaron correctamente');
      await this.load(this.model.id);
      return;
    }

    this.errors = result.errors || {};
    this.error(result.title || 'Programación de pagos', result.messageResponse || 'No se pudieron agregar las líneas');
  }
}
