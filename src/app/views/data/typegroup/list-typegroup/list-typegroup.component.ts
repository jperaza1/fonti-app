
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { TypeGroupService } from '../typegroup.service';
import { CreateOrUpdateTypeGroupComponent } from '../create-or-update-typegroup/create-or-update-typegroup.component';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { RequestResult } from '../../../../../_models/RequestResult';
import { TypeGroupModel } from '../models/TypeGroupModel';

@Component({
  selector: 'app-list-typegroup',
  templateUrl: './list-typegroup.component.html',
  styleUrls: ['./list-typegroup.component.css']
})
export class ListTypeGroupComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: TypeGroupModel[] = [];
  title: string = "TypeGroup";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateTypeGroupComponent;

  constructor(
    private _typeGroupService: TypeGroupService
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
    this.DataSource = await this._typeGroupService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
    try {

    } catch (err) { }
  }

  update(data: TypeGroupModel) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: TypeGroupModel) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: TypeGroupModel) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._typeGroupService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: TypeGroupModel) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._typeGroupService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
}
