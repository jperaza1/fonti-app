import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { RouteDto } from '../dtos/route-dto';
import { RouteService } from '../route.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateRouteComponent } from '../create-or-update-route/create-or-update-route.component';

@Component({
  selector: 'app-list-route',
  templateUrl: './list-route.component.html',
  styleUrls: ['./list-route.component.css'],
})
export class ListRouteComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: RouteDto[] = [];
  title: string = 'Rutas';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateRouteComponent;

  constructor(private _routeService: RouteService) {
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
        dataField: 'deliversRegalia',
        caption: 'Regalía',
        allowEditing: false,
        width: '120',
        alignment: 'center',
        calculateCellValue: (row) => row.deliversRegalia ? 'Sí' : 'No',
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
    this.DataSource = await this._routeService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: RouteDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: RouteDto
  ) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: RouteDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._routeService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: RouteDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let enableResponse = await this._routeService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
