import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PaymentScheduleDto } from '../dtos/payment-schedule.dto';
import { PaymentScheduleService } from '../payment-schedule.service';

@Component({
  selector: 'app-list-payment-schedule',
  templateUrl: './list-payment-schedule.component.html',
})
export class ListPaymentScheduleComponent extends AppComponentBase implements OnInit {
  title = 'Programación de pagos';
  columns: any[] = [];
  DataSource: PaymentScheduleDto[] = [];

  constructor(private _paymentScheduleService: PaymentScheduleService) {
    super();
  }

  ngOnInit() {
    this.initializeColumns();
    this.getAll();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'id',
        caption: 'Acciones',
        allowEditing: false,
        cellTemplate: 'actionTemplate',
        alignment: 'center',
        width: 90,
        allowExporting: false,
      },
      {
        dataField: 'date',
        caption: 'Fecha',
        cellTemplate: 'dateTemplate',
      },
      {
        dataField: 'descripcion',
        caption: 'Descripción',
      },
      {
        dataField: 'detailCount',
        caption: 'Líneas',
      },
      {
        dataField: 'accumulatedAmount',
        caption: 'Acumulado',
        cellTemplate: 'amountTemplate',
      },
      {
        dataField: 'projectedAmount',
        caption: 'Proyectado',
        cellTemplate: 'amountTemplate',
      },
      {
        dataField: 'realAmount',
        caption: 'Real',
        cellTemplate: 'amountTemplate',
      },
      {
        dataField: 'pendingAmount',
        caption: 'Pendiente',
        cellTemplate: 'amountTemplate',
      },
    ];
  }

  create() {
    window.open('/payment-schedule/create', '_blank');
  }

  view(data: PaymentScheduleDto) {
    window.open(`/payment-schedule/view/${data.id}`, '_blank');
  }

  async getAll() {
    this.DataSource = await this._paymentScheduleService.getAll();
  }
}
