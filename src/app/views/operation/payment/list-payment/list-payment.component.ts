import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { Router } from '@angular/router';
import { PaymentDto } from '../dtos/payment.dto';
import { PaymentService } from '../payment.service';
import { FilterPaymentDto } from '../dtos/filter-payment.dto';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { User } from '../../../../../_models/user';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.css']
})
export class ListPaymentComponent extends AppComponentBase implements OnInit {
  title: string = 'Pagos';
  columns: any[] = [];
  DataSource: PaymentDto[] = [];

  filterModel: FilterPaymentDto = new FilterPaymentDto();
  currentUser: User;
  updateBankReference: boolean = false;

  constructor(private _paymentService: PaymentService, private _authenticationService: AuthenticationService) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
    this.updateBankReference = this._authenticationService.IsInRole('OPERATION.PAYMENT.FINISH');
  }

  ngOnInit() {
    this.initializeColumns();
    this.getAll();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'reference',
        caption: 'Referencia',
      },
      {
        dataField: 'paymentStatusName',
        caption: 'Estado',
      },
      {
        dataField: 'paymentDate',
        caption: 'Fecha de Pago',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'amount',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'invoiceCount',
        caption: 'Cantidad de Facturas',
      },
      {
        dataField: 'bankReference',
        caption: 'Referencia Bancaria',
        cellTemplate: 'bankReferenceTemplate'
      },
      {
        dataField: 'notes',
        caption: 'Notas',
        width: 250,
        cellTemplate: 'notesTemplate'
      }
    ];
  }

  create() {
    window.open('/payment/create', '_blank');
  }

  async getAll() {
    this.DataSource = await this._paymentService.getAll(this.filterModel);
  }

  update(data: PaymentDto) {
    window.open(`/payment/update/${data.id}`, '_blank');
  }

  async delete(data: PaymentDto) {
    let confirmResult = await this.confirm();
    if (confirmResult.value) {
      let disableResponse = await this._paymentService.delete(data.id);
      if (disableResponse.success) {
        await this.getAll();
      }
    }
  }

  async onFocusOutBankReference(data: PaymentDto) {
    console.log(data);
    var result = await this._paymentService.finishPayment(data.id, data);
    if (result.success) {
      this.success(result.title, result.messageResponse);
      await this.getAll();
    } else {
      this.error(result.title, result.messageResponse);
    }
  }

  async onFocusOutNotes(data: PaymentDto) {
    var result = await this._paymentService.updateNotes(data.id, data);
    if (result.success) {
      this.success(result.title, result.messageResponse);
      await this.getAll();
    } else {
      this.error(result.title, result.messageResponse);
    }
  }
}
