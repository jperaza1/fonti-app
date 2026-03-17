


import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { TypeGroupService } from '../../typegroup/typegroup.service';
import { TypeGroupModel } from '../../typegroup/models/TypeGroupModel';
import { TypeDto } from '../dtos/type-dto';
import { TypeService } from '../type.service';



@Component({
  selector: 'app-create-or-update-type',
  templateUrl: './create-or-update-type.component.html',
  styleUrls: ['./create-or-update-type.component.css']
})

export class CreateOrUpdateTypeComponent extends AppComponentBase implements OnInit {
  Model: TypeDto = new TypeDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  QuickCreate: boolean = false;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  DxDataSourceTypeGroups: any = {};

  constructor(
    private _typeGroupService: TypeGroupService,
    private _TypeService: TypeService,
  ) {
    super();

  }

  async ngOnInit() {
    await this.initializeView();
  }

  async initializeView() {
    this.errors = {};
    await this.getActiveTypeGroups();
  }


  async getActiveTypeGroups() {
    let typeGroups = await this._typeGroupService.getActives();
    this.DxDataSourceTypeGroups = this.getDataSourceDx(typeGroups);
  }

  onItemClickTypeGroup(typeGroup: TypeGroupModel) {
    // this.Model.code = typeGroup.code;
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


  async showUpdate(data: TypeDto) {
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = data;
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new TypeDto();
    this.entityComponent.show();
  }

  async quickCreate(code: string) {
    this.QuickCreate = true;
    let typeGroup = await this._typeGroupService.getTypeGroupByCode(code);
    this.Model = new TypeDto();
    this.Model.typeGroupId = typeGroup.id;
    this.setButtonOptions();
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
      if (this.isEmptyOrNullString(this.Model.code))
        this.Model.code = this.Model.name;
      let createResponse = await this._TypeService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._TypeService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }


}
