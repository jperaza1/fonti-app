import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DistributorDto } from '../dtos/distributor-dto';
import { DistributorService } from '../distributor.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateDistributorComponent } from '../create-or-update-distributor/create-or-update-distributor.component';

@Component({
  selector: 'app-list-distributor',
  templateUrl: './list-distributor.component.html',
  styleUrls: ['./list-distributor.component.css'],
})
export class ListDistributorComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: DistributorDto[] = [];
  title: string = 'Distribuidores';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateDistributorComponent;

  constructor(private _distributorService: DistributorService) {
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
    this.DataSource = await this._distributorService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: DistributorDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(
    requestResult: RequestResult,
    item: DistributorDto
  ) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: DistributorDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._distributorService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: DistributorDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let enableResponse = await this._distributorService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
