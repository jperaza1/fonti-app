import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { SideItemDto } from '../dtos/side-item.dto';
import { SideItemService } from '../side-item.service';
import { CreateOrUpdateSideItemComponent } from '../create-or-update-side-item/create-or-update-side-item.component';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-list-side-item',
  templateUrl: './list-side-item.component.html',
  styleUrls: ['./list-side-item.component.css']
})
export class ListSideItemComponent extends AppComponentBase implements OnInit {
  title: string = 'Complementos';
  DataSource: SideItemDto[] = [];
  columns: any[] = [];

  @ViewChild("createOrUpdateSideItem") createOrUpdateSideItem: CreateOrUpdateSideItemComponent;

  constructor(
    private _sideItemService: SideItemService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getAll();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'name',
        caption: 'Nombre'
      }
    ];
  }

  async getAll() {
    this.DataSource = await this._sideItemService.getAll();
  }

  onClickRefresh() {
    this.getAll();
  }

  onClickNew() {
    this.createOrUpdateSideItem.showAdd();
  }

  update(data: SideItemDto) {
    this.createOrUpdateSideItem.showEdit(data.id);
  }

  async onClickDisable(data: SideItemDto) {
    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._sideItemService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }
    //this.createOrUpdateSideItem.disable(data.id);
  }

  async onClickEnable(data: SideItemDto) {
    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._sideItemService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }
    //this.createOrUpdateSideItem.enable(data.id);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: SideItemDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

}
