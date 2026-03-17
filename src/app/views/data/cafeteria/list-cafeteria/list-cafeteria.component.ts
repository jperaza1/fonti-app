import { Component, OnInit, ViewChild } from '@angular/core';
import { CafeteriaDto } from '../dtos/cafeteria-dto';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CafeteriaService } from '../cafeteria.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateCafeteriaComponent } from '../create-or-update-cafeteria/create-or-update-cafeteria.component';

@Component({
  selector: 'app-list-cafeteria',
  templateUrl: './list-cafeteria.component.html',
  styleUrls: ['./list-cafeteria.component.css']
})
export class ListCafeteriaComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: CafeteriaDto[] = [];
  title: string = "Cafeterias";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateCafeteriaComponent;

  constructor(
    private _cafeteriaService: CafeteriaService
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

  async ngOnInit() {
    await this.getAll();
  }

  async getAll() {
    this.DataSource = await this._cafeteriaService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: CafeteriaDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: CafeteriaDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: CafeteriaDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._cafeteriaService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: CafeteriaDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._cafeteriaService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }

}
