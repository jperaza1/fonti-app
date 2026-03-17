import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { ConfigurationService } from '../configuration.service';
import { ConfigurationDto } from '../models/configuration-dto';

@Component({
  selector: 'app-create-or-update-configuration',
  templateUrl: './create-or-update-configuration.component.html',
  styleUrls: ['./create-or-update-configuration.component.css']
})
export class CreateOrUpdateConfigurationComponent extends AppComponentBase implements OnInit {

  Model: ConfigurationDto = new ConfigurationDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _configurationService: ConfigurationService) {
    super();
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("CONFIGURATION.UPDATE");
    // else
    //   permission.push("CONFIGURATION.CREATE");
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  ngOnInit() {
    this.initializeView();
  }

  async initializeView() {
    this.errors = {};
  }

  async showUpdate(id: number) {
    this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._configurationService.getById(id);
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new ConfigurationDto();
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

      let createResponse = await this._configurationService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._configurationService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }


}
