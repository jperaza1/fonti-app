import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CustomerService } from '../customer.service';
import { CustomerDto } from '../dtos/customer-dto';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateCustomerComponent } from '../create-or-update-customer/create-or-update-customer.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: CustomerDto[] = [];
  title: string = "Clientes";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateCustomerComponent;

  constructor(
    private _customerService: CustomerService
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
        caption: "Nombre",
        allowEditing: false
      },
      {
        dataField: "rtn",
        caption: "Rtn",
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

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    this.DataSource = await this._customerService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: CustomerDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: CustomerDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: CustomerDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._customerService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: CustomerDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._customerService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

}
