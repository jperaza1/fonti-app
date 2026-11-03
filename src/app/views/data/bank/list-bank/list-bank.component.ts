import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { BankDto } from '../dtos/bank-dto';
import { BankService } from '../bank.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateBankComponent } from '../create-or-update-bank/create-or-update-bank.component';

@Component({
  selector: 'app-list-bank',
  templateUrl: './list-bank.component.html',
  styleUrls: ['./list-bank.component.css'],
})
export class ListBankComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: BankDto[] = [];
  title: string = 'Bancos';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateBankComponent;

  constructor(private _bankService: BankService) {
    super();
    this.columns = [
      {
        dataField: 'id',
        caption: 'Actions',
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
        dataField: 'code',
        caption: 'Código',
        allowEditing: false,
      },
      {
        dataField: 'isActive',
        caption: 'Status',
        allowEditing: false,
        width: '120',
        alignment: 'center',
        cellTemplate: 'statusTemplate',
        allowExporting: true,
        calculateDisplayValue: (value) => (value ? 'ACTIVE' : 'INACTIVE'),
      },
    ];
  }

  async ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._bankService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: BankDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: BankDto
  ) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: BankDto) {
    const confirm = await this.confirm();
    if (confirm.value) {
      const disableResponse = await this._bankService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: BankDto) {
    const confirm = await this.confirm();
    if (confirm.value) {
      const enableResponse = await this._bankService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
