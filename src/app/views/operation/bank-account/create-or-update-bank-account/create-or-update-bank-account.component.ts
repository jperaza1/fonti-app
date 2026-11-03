import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { BankAccountDto } from '../dtos/bank-account.dto';
import { OptionButton } from '../../../shared/models/option-button';
import { BankAccountService } from '../bank-account.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { BankService } from '../../../data/bank/bank.service';
import { BankDto } from '../../../data/bank/dtos/bank-dto';

@Component({
  selector: 'app-create-or-update-bank-account',
  templateUrl: './create-or-update-bank-account.component.html',
  styleUrls: ['./create-or-update-bank-account.component.css'],
})
export class CreateOrUpdateBankAccountComponent extends AppComponentBase implements OnInit {
  Model: BankAccountDto = new BankAccountDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  modalTitle = 'Cuenta bancaria';

  DxBanks: BankDto[] = [];

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<void>();

  constructor(
    private _bankAccountService: BankAccountService,
    private _bankService: BankService) {
    super();
  }

  ngOnInit(): void {
    this.initializeView();
  }

  get isEdit(): boolean {
    return !this.isEmptyOrNullNumber(this.Model.id);
  }

  async getBanks() {
    let result = await this._bankService.getAll();
    this.DxBanks = result;
  }

  async initializeView() {
    this.errors = {};
    await this.getBanks();
  }

  setButtonOptions() {
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', []),
    ];
  }

  async showUpdate(data: BankAccountDto) {
    await this.initializeView();
    this.setButtonOptions();
    this.modalTitle = 'Editar cuenta bancaria';
    this.Model = await this._bankAccountService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
    this.modalTitle = 'Nueva cuenta bancaria';
    this.Model = new BankAccountDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'save':
        this.save();
        break;
      case 'close':
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
    if (this.isEmptyOrNullString(this.Model.name?.trim())) {
      this.error('Validación', 'Indique el nombre de la cuenta.');
      return;
    }

    if (this.isEmptyOrNullNumber(this.Model.id)) {
      const createResponse = await this._bankAccountService.create({
        name: this.Model.name.trim(),
        isActive: this.Model.isActive,
        bankId: this.Model.bankId,
      });
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._bankAccountService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);
    }
  }

  close() {
    this.entityComponent.close();
  }
}
