import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { UnitOfMeasureDto } from '../dtos/unit-of-measure-dto';
import { UnitOfMeasureService } from '../unit-of-measure.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateUnitOfMeasureComponent } from '../create-or-update-unit-of-measure/create-or-update-unit-of-measure.component';

@Component({
  selector: 'app-list-unit-of-measure',
  templateUrl: './list-unit-of-measure.component.html',
  styleUrls: ['./list-unit-of-measure.component.css'],
})
export class ListUnitOfMeasureComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: UnitOfMeasureDto[] = [];
  title: string = 'Unidades de medida';

  @ViewChild('createOrUpdateModal')
  createOrUpdateModal: CreateOrUpdateUnitOfMeasureComponent;

  constructor(private _unitOfMeasureService: UnitOfMeasureService) {
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
    this.DataSource = await this._unitOfMeasureService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: UnitOfMeasureDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: UnitOfMeasureDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: UnitOfMeasureDto) {
    const confirm = await this.confirm();
    if (confirm.value) {
      const disableResponse = await this._unitOfMeasureService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: UnitOfMeasureDto) {
    const confirm = await this.confirm();
    if (confirm.value) {
      const enableResponse = await this._unitOfMeasureService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);
    }
  }
}
