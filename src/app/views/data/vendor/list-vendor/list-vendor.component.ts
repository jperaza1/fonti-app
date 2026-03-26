import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { VendorDto } from '../dtos/vendor-dto';
import { VendorService } from '../vendor.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateVendorComponent } from '../create-or-update-vendor/create-or-update-vendor.component';

@Component({
  selector: 'app-list-vendor',
  templateUrl: './list-vendor.component.html',
  styleUrls: ['./list-vendor.component.css']
})
export class ListVendorComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: VendorDto[] = [];
  title: string = "Proveedores";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateVendorComponent;

  constructor(
    private _vendorService: VendorService
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
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._vendorService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: VendorDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: VendorDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: VendorDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._vendorService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: VendorDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let enableResponse = await this._vendorService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);

    }

  }

}
