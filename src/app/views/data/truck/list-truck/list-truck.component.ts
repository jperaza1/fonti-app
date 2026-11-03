import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { TruckDto } from '../dtos/truck-dto';
import { TruckService } from '../truck.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateTruckComponent } from '../create-or-update-truck/create-or-update-truck.component';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
})
export class ListTruckComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: TruckDto[] = [];
  title: string = 'Camiones';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateTruckComponent;

  constructor(private _truckService: TruckService) {
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
        caption: 'Descripción',
        allowEditing: false,
      },
      {
        dataField: 'plate',
        caption: 'Placa',
        allowEditing: false,
        width: '140',
      },
      {
        dataField: 'routeName',
        caption: 'Ruta',
        allowEditing: false,
        width: '140',
      },
      {
        dataField: 'truckStatusName',
        caption: 'Estado',
        allowEditing: false,
        width: '160',
      },
      {
        dataField: 'isActive',
        caption: 'Status',
        allowEditing: false,
        width: '120',
        alignment: 'center',
        cellTemplate: 'statusTemplate',
        allowExporting: true,
        calculateDisplayValue: (row) => (row.isActive ? 'ACTIVE' : 'INACTIVE'),
      },
    ];
  }

  async ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._truckService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: TruckDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: TruckDto
  ) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: TruckDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._truckService.inactive(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: TruckDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let enableResponse = await this._truckService.active(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
