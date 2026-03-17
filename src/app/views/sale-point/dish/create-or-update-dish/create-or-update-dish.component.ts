import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DishService } from '../dish.service';
import { DishDto } from '../dtos/dish.dto';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { User } from '../../../../../_models/user';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { RequestResult } from '../../../../../_models/RequestResult';
import { OptionButton } from '../../../shared/models/option-button';

@Component({
  selector: 'app-create-or-update-dish',
  templateUrl: './create-or-update-dish.component.html',
  styleUrls: ['./create-or-update-dish.component.css']
})
export class CreateOrUpdateDishComponent extends AppComponentBase implements OnInit {
  title: string = 'Nuevo Plato';
  Model: DishDto = new DishDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  DxDataSourceDishType: any = {};
  DxDataSourceSaleTypeDish: any = {};
  DxDataSourceCafeteria: any = {};
  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();


  constructor(
    private _dishService: DishService,
    private _enumService: EnumDefinitionsService,
    private _cafeteriaService: CafeteriaService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  async initializeView() {
    this.errors = {};
    await this.getDishType();
    await this.getSaleTypeDish();
    await this.getCafeterias();
  }

  async getDishType() {
    const response = await this._enumService.getDishType();
    this.DxDataSourceDishType = this.getDataSourceDx(response);
  }

  async getSaleTypeDish() {
    const response = await this._enumService.getSaleTypeDish();
    this.DxDataSourceSaleTypeDish = this.getDataSourceDx(response);
  }

  async getCafeterias() {
    const response = await this._cafeteriaService.getAll();
    this.DxDataSourceCafeteria = this.getDataSourceDx(response);
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    // else
    //   permission.push("TYPES.CREATE");

    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showAdd() {
    this.title = "Nuevo Plato";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new DishDto();
    this.entityComponent.show();
  }

  async showEdit(id: number) {
    this.title = "Editar Plato";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = await this._dishService.getById(id);
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.save();
        break;
      case "close":
        this.close();
        break;
    }
  }

  async save() {
    if(this.Model.id > 0) {
      const response = await this._dishService.update(this.Model, this.Model.id);
      this.validResponse(response);
    } else {
      const response = await this._dishService.create(this.Model);
      this.validResponse(response);
    }
  }

  close() {
    this.entityComponent.close();
  }
}
