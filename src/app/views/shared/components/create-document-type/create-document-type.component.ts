import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { TypeDto } from '../../../data/type/dtos/type-dto';
import { OptionButton } from '../../models/option-button';
import { ModalWithOptionButtonsComponent } from '../modal-with-option-buttons/modal-with-option-buttons.component';
import { TypeGroupService } from '../../../data/typegroup/typegroup.service';
import { TypeService } from '../../../data/type/type.service';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-create-document-type',
  templateUrl: './create-document-type.component.html',
  styleUrls: ['./create-document-type.component.css']
})
export class CreateDocumentTypeComponent extends AppComponentBase implements OnInit {
  Model: TypeDto = new TypeDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  QuickCreate: boolean = true;

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
