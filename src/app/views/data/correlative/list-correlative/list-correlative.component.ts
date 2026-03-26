import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CorrelativeDto } from '../dtos/correlative-dto';
import { CorrelativeService } from '../correlative.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateCorrelativeComponent } from '../create-or-update-correlative/create-or-update-correlative.component';

@Component({
  selector: 'app-list-correlative',
  templateUrl: './list-correlative.component.html',
  styleUrls: ['./list-correlative.component.css'],
})
export class ListCorrelativeComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: CorrelativeDto[] = [];
  title: string = 'Correlativos';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateCorrelativeComponent;

  constructor(private _correlativeService: CorrelativeService) {
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
        dataField: 'cai',
        caption: 'CAI',
        allowEditing: false,
      },
      {
        dataField: 'start',
        caption: 'Desde',
        allowEditing: false,
        width: '100',
      },
      {
        dataField: 'end',
        caption: 'Hasta',
        allowEditing: false,
        width: '100',
      },
      {
        dataField: 'current',
        caption: 'Actual',
        allowEditing: false,
        width: '100',
      },
      {
        dataField: 'startDate',
        caption: 'Fecha Solicitud',
        allowEditing: false,
        cellTemplate: 'dateTemplate',
      },
      {
        dataField: 'endDate',
        caption: 'Fecha Limite de Emision',
        allowEditing: false,
        cellTemplate: 'dateTemplate',
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
    this.DataSource = await this._correlativeService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: CorrelativeDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: CorrelativeDto
  ) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: CorrelativeDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._correlativeService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: CorrelativeDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let enableResponse = await this._correlativeService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
