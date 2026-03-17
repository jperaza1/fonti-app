import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DishDto } from '../dtos/dish.dto';
import { DishService } from '../dish.service';
import { CreateOrUpdateDishComponent } from '../create-or-update-dish/create-or-update-dish.component';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-list-dish',
  templateUrl: './list-dish.component.html',
  styleUrls: ['./list-dish.component.css']
})
export class ListDishComponent extends AppComponentBase implements OnInit {
  title: string = 'Platos';
  DataSource: DishDto[] = [];
  columns: any[] = [];

  @ViewChild("createOrUpdateDish") createOrUpdateDish: CreateOrUpdateDishComponent;

  constructor(
    private _dishService: DishService
  ) { 
    super();
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
      },
      {
        dataField: 'dishTypeName',
        caption: 'Tipo de Plato'
      },
    ];
  }

  ngOnInit(): void {
    this.initializeColumns();
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._dishService.getAll();
  }

  onClickRefresh() {
    this.getAll();
  }

  onClickNew() {
    this.createOrUpdateDish.showAdd();
  }

  update(data: DishDto) {
    this.createOrUpdateDish.showEdit(data.id);
  }

  async onClickDisable(data: DishDto) {
    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._dishService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }
    //this.createOrUpdateSideItem.disable(data.id);
  }

  async onClickEnable(data: DishDto) {
    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._dishService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }
    //this.createOrUpdateSideItem.enable(data.id);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: DishDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

}
