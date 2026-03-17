
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { TypeGroupService } from '../typegroup.service';
import { TypeGroupModel } from '../models/TypeGroupModel';

@Component({
  selector: 'app-create-or-update-typegroup',
  templateUrl: './create-or-update-typegroup.component.html',
  styleUrls: ['./create-or-update-typegroup.component.css']
})
export class CreateOrUpdateTypeGroupComponent extends AppComponentBase implements OnInit {

  form: FormGroup;
  Model: TypeGroupModel = new TypeGroupModel();
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _typeGroupService: TypeGroupService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.errors = {};
    this.form = this.fb.group({
      "name": ["", Validators.required],
      "code": ["", Validators.required],
      "isActive": [],
      "id": []
    });
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPE_GROUP.UPDATE");
    // else
    //   permission.push("TYPE_GROUP.CREATE");
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }


  showAdd() {
    this.formInit();
    this.setButtonOptions();
    this.Model = new TypeGroupModel();
    this.entityComponent.show();
  }

  showUpdate(data: TypeGroupModel) {
    this.formInit();
    this.setButtonOptions(true);
    this.Model = this.clone(data);
    this.form.setValue(this.Model);
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
    this.Model = this.form.value;
    if (this.isEmptyOrNullNumber(this.Model.id)) {

      let createResponse = await this._typeGroupService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._typeGroupService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }

}
