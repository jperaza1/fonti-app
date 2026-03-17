import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ConfigurationService } from '../configuration.service';
import { CreateOrUpdateConfigurationComponent } from '../create-or-update-configuration/create-or-update-configuration.component';
import { ConfigurationDto } from '../models/configuration-dto';

@Component({
  templateUrl: './list-configuration.component.html',
  styleUrls: ['./list-configuration.component.css']
})
export class ListConfigurationComponent extends AppComponentBase implements OnInit {

  DataSource: ConfigurationDto[] = [];
  title: string;
  columns: any[] = [];
  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateConfigurationComponent;


  constructor(private _configurationService: ConfigurationService) {
    super();
    this.title = "Configurations";
    this.initializeColumns();
  }

  initializeColumns() {
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
        dataField: "key",
        caption: "Key",
        allowEditing: false
      },

      {
        dataField: "value",
        caption: "Value",
        allowEditing: false
      },
      {
        dataField: "isActive",
        caption: "Status",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate",
        allowExporting: false
      }
    ];
  }

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    this.DataSource = await this._configurationService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: ConfigurationDto) {
    this.createOrUpdateModal.showUpdate(data.id);
  }

  async disable(data: ConfigurationDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._configurationService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: ConfigurationDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async enable(data: ConfigurationDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._configurationService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }

}
