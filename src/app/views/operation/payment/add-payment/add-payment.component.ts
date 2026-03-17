import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PaymentDto } from '../dtos/payment.dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { RequestResult } from '../../../../../_models/RequestResult';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent extends AppComponentBase implements OnInit {
  Model: PaymentDto = new PaymentDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = "Agregar Pago";
  DxDataSourcePaymentMethod: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _enumsService: EnumDefinitionsService,
    private _paymentService: PaymentService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  async initializeView() {
    this.errors = {};
    await this.getPaymentMethod();
  }

  async getPaymentMethod() {
    const response = await this._enumsService.getPaymentMethod();
    this.DxDataSourcePaymentMethod = this.getDataSourceDx(response);
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showAdd(invoiceId: number) {
    this.title = "Agregar Pago";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new PaymentDto();
    this.Model.invoiceId = invoiceId;
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
    var response = await this._paymentService.addPayment(this.Model);
    this.validResponse(response);
  }

  close() {
    this.entityComponent.close();
  }

}
