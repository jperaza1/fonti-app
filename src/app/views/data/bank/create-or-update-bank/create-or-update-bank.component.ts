import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { BankDto } from '../dtos/bank-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { BankService } from '../bank.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-or-update-bank',
  templateUrl: './create-or-update-bank.component.html',
  styleUrls: ['./create-or-update-bank.component.css'],
})
export class CreateOrUpdateBankComponent extends AppComponentBase implements OnInit {
  Model: BankDto = new BankDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Banco';

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _bankService: BankService) {
    super();
  }

  ngOnInit(): void {}

  initializeView() {
    this.errors = {};
  }

  setButtonOptions() {
    const permission: string[] = [];
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', permission),
    ];
  }

  async showUpdate(data: BankDto) {
    this.title = 'Editar banco';
    this.initializeView();
    this.setButtonOptions();
    this.Model = await this._bankService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nuevo banco';
    this.initializeView();
    this.setButtonOptions();
    this.Model = new BankDto();
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
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      const createResponse = await this._bankService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._bankService.update(
        this.Model,
        this.Model.id
      );
      this.validResponse(updateResponse);
    }
  }

  close() {
    this.entityComponent.close();
  }
}
