import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CreateOrUpdateTenantComponent } from '../create-or-update-tenant/create-or-update-tenant.component';
import { TenantDto } from '../dtos/tenant-dto';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-list-tenant',
  templateUrl: './list-tenant.component.html',
  styleUrls: ['./list-tenant.component.css']
})
export class ListTenantComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: TenantDto[] = [];
  title: string = "Companies";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateTenantComponent;

  constructor(private _tenantService: TenantService) {
    super();
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center"
      },
      {
        dataField: "name",
        caption: "Name",
        allowEditing: false
      },
      {
        dataField: "email",
        caption: "Email",
        allowEditing: false
      },
      {
        dataField: "phoneNumber",
        caption: "Phone Number",
        allowEditing: false
      },
      {
        dataField: "address",
        caption: "Address",
        allowEditing: false
      },
      {
        dataField: "isActive",
        caption: "Status",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate"
      }
    ];
  }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._tenantService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
    try {

    } catch (err) { }
  }

  update(data: TenantDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: TenantDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: TenantDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._tenantService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: TenantDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._tenantService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }

}
