import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterDto } from '../dtos/register-dto';
import { AppComponentBase } from '../../../../AppComponentBase';
import { RegisterService } from '../register.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateRegisterComponent } from '../create-or-update-register/create-or-update-register.component';

@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.component.html',
  styleUrls: ['./list-register.component.css']
})
export class ListRegisterComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: RegisterDto[] = [];
  title: string = "Cajas";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateRegisterComponent;

  
  constructor(
    private _registerService: RegisterService
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
        dataField: "cafeteria",
        caption: "Cafeteria",
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
    this.DataSource = await this._registerService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: RegisterDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: RegisterDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: RegisterDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._registerService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

  async enable(data: RegisterDto) {
    let confirm = await this.confirm();
    if (confirm.value) {
      let disableResponse = await this._registerService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);
    }
  }

}