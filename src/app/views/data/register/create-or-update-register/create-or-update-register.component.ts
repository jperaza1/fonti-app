import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../../shared/models/option-button';
import { RegisterDto } from '../dtos/register-dto';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { CafeteriaService } from '../../cafeteria/cafeteria.service';
import { RegisterService } from '../register.service';
import { ProductDto } from '../../product/dtos/product-dto';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-create-or-update-register',
  templateUrl: './create-or-update-register.component.html',
  styleUrls: ['./create-or-update-register.component.css']
})
export class CreateOrUpdateRegisterComponent extends AppComponentBase implements OnInit {
  Model: RegisterDto = new RegisterDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = "Producto";

  DxDataSourceCafeteria: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();
  constructor(
    private _cafeteriaService: CafeteriaService,
    private _registerService: RegisterService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  async getCafeterias() {
    const response = await this._cafeteriaService.getAll();
    this.DxDataSourceCafeteria = this.getDataSourceDx(response);
  }

  async initializeView() {
    this.errors = {};
    await this.getCafeterias();
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

  async showUpdate(data: RegisterDto) {
    this.title = "Editar Producto";
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._registerService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = "Nuevo Producto";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new RegisterDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.save();
        break;
    }
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

  async save() {
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      let createResponse = await this._registerService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._registerService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);
    }
  }

  close() {
    this.entityComponent.close();
  }
  
}
