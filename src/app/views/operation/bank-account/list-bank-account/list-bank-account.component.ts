import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { BankAccountDto } from '../dtos/bank-account.dto';
import { BankAccountService } from '../bank-account.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateBankAccountComponent } from '../create-or-update-bank-account/create-or-update-bank-account.component';

@Component({
  selector: 'app-list-bank-account',
  templateUrl: './list-bank-account.component.html',
  styleUrls: ['./list-bank-account.component.css'],
})
export class ListBankAccountComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: BankAccountDto[] = [];
  title = 'Cuentas bancarias';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateBankAccountComponent;

  constructor(private _bankAccountService: BankAccountService) {
    super();
    this.columns = [
      {
        dataField: 'id',
        caption: 'Acciones',
        allowEditing: false,
        width: '120',
        cellTemplate: 'actionTemplate',
        alignment: 'center',
        allowExporting: false,
      },
      {
        dataField: 'name',
        caption: 'Nombre',
        allowEditing: false,
      },
      {
        dataField: 'bankName',
        caption: 'Banco',
        allowEditing: false,
      },
      {
        dataField: 'balance',
        caption: 'Saldo',
        allowEditing: false,
        cellTemplate: 'amountTemplate',
      },
      {
        dataField: 'isActive',
        caption: 'Estado',
        allowEditing: false,
        width: '120',
        alignment: 'center',
        cellTemplate: 'statusTemplate',
        allowExporting: true,
        calculateDisplayValue: (row: BankAccountDto) => (row.isActive ? 'ACTIVO' : 'INACTIVO'),
      },
    ];
  }

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    this.DataSource = await this._bankAccountService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: BankAccountDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: BankAccountDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: BankAccountDto) {
    const confirm = await this.confirm();
    if (confirm.value) {
      const res = await this._bankAccountService.disable(data.id);
      this.validResponseDisableEnableAction(res, data);
    }
  }

  async enable(data: BankAccountDto) {
    const confirm = await this.confirm();
    if (confirm.value) {
      const res = await this._bankAccountService.enable(data.id);
      this.validResponseDisableEnableAction(res, data);
    }
  }
}
