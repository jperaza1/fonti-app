import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CreateOrUpdateTypeComponent } from '../create-or-update-type/create-or-update-type.component';
import { TypeDto } from '../dtos/type-dto';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.css']
})
export class ListTypeComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: TypeDto[] = [];
  title: string = "Types";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateTypeComponent;

  constructor(
    private _typeService: TypeService
  ) {
    super();
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: false
      },
      {
        dataField: "name",
        caption: "Name",
        allowEditing: false
      },
      {
        dataField: "code",
        caption: "Code",
        allowEditing: false
      },
      {
        dataField: "typeGroupName",
        caption: "TypeGroup",
        allowEditing: false
      },
      {
        dataField: "isActive",
        caption: "Status",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate",
        allowExporting: true,
        calculateDisplayValue: value => value ? "ACTIVE" : "INACTIVE"
      }
    ];
  }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._typeService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
    try {

    } catch (err) { }
  }

  update(data: TypeDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: TypeDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: TypeDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._typeService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: TypeDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._typeService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
}
