import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '../../../AppComponentBase';
import { AlerEmailService } from '../alert-email.services';
import { CreateOrUpdateAlertEmailComponent } from '../create-or-update-alert-email/create-or-update-alert-email.component';
import { AlertEmailDto } from '../dtos/alert-email-dto';
import { RequestResult } from '../../../../_models/RequestResult';

@Component({
  selector: 'app-list-alert-email',
  templateUrl: './list-alert-email.component.html',
  styleUrls: ['./list-alert-email.component.css']
})
export class ListAlertEmailComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: AlertEmailDto[] = [];
  title: string = "Alert Emails";

  @ViewChild("createOrUpdateModal")
  createOrUpdateModal: CreateOrUpdateAlertEmailComponent;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: AlerEmailService
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
        allowExporting: true,
      },
      {
        dataField: "name",
        caption: "Name",
        allowEditing: false,
      },
      {
        dataField: "bodyType",
        caption: "Email Type",
        allowEditing: false,
      },
      {
        dataField: "alertBy",
        caption: "Alert By",
        allowEditing: false,
      },
      {
        dataField: "isActive",
        caption: "Status",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate",
        calculateDisplayValue: (value) => (value ? "ACTIVE" : "INACTIVE"),
      },
    ];
  }

  ngOnInit() {
    this.getAll();
  }
  async getAll() {
    this.DataSource = await this._service.getAll();
  }
  create() {
    this.createOrUpdateModal.showAdd();
    try {
    } catch (err) { }
  }

  update(data: AlertEmailDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  async disable(data: AlertEmailDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._service.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: AlertEmailDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._service.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: AlertEmailDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

}
