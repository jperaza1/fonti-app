import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { VendorDto } from '../dtos/vendor-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { VendorService } from '../vendor.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { BankService } from '../../bank/bank.service';
import { TypeService } from '../../type/type.service';

@Component({
  selector: 'app-create-or-update-vendor',
  templateUrl: './create-or-update-vendor.component.html',
  styleUrls: ['./create-or-update-vendor.component.css']
})
export class CreateOrUpdateVendorComponent extends AppComponentBase implements OnInit {
  Model: VendorDto = new VendorDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  isInRoleShowBankAccount: boolean = false;

  DxDataSourceBank: any = {};
  DxDataSourceTypeAccount: any = {};

  constructor(
    private _vendorService: VendorService,
    private _bankService: BankService,
    private _typeService: TypeService,
    private _authenticationService: AuthenticationService,
  ) { 
    super();
    this.isInRoleShowBankAccount = this._authenticationService.IsInRole('DATA.VENDOR.SHOW_BANK_ACCOUNT');
  }

  ngOnInit(): void {
    this.initializeView();
  }

  async initializeView() {
    this.errors = {};
    await this.getBanks();
    await this.getTypes();
  }

  async getBanks() {
    const response = await this._bankService.getActives();
    this.DxDataSourceBank = this.getDataSourceDx(response);
  }

  async getTypes() {
    const response = await this._typeService.getAciteTypesByGroupCode('VENDOR_TYPE_ACCOUNT');
    this.DxDataSourceTypeAccount = this.getDataSourceDx(response);
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

  async showUpdate(data: VendorDto) {
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._vendorService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new VendorDto();
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
      let createResponse = await this._vendorService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._vendorService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }

}
