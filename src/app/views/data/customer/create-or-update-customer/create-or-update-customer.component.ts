import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CustomerDto } from '../dtos/customer-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { CustomerService } from '../customer.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-or-update-customer',
  templateUrl: './create-or-update-customer.component.html',
  styleUrls: ['./create-or-update-customer.component.css']
})
export class CreateOrUpdateCustomerComponent extends AppComponentBase implements OnInit {
  Model: CustomerDto = new CustomerDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _customerService: CustomerService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initializeView();
  }

  async initializeView() {
    this.errors = {};
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showUpdate(data: CustomerDto) {
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._customerService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new CustomerDto();
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
      let createResponse = await this._customerService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._customerService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }
  

}
