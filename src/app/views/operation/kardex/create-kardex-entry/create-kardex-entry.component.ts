import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { KardexEntryDto, ProductStockDto } from '../dtos/kardex-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { KardexService } from '../kardex.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-kardex-entry',
  templateUrl: './create-kardex-entry.component.html',
  styleUrls: ['./create-kardex-entry.component.css'],
})
export class CreateKardexEntryComponent extends AppComponentBase implements OnInit {
  Model: KardexEntryDto = new KardexEntryDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Entrada de inventario';
  products: any[] = [];

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _kardexService: KardexService) {
    super();
  }

  ngOnInit(): void {}

  setButtonOptions() {
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', []),
    ];
  }

  show(stocks: ProductStockDto[]) {
    this.errors = {};
    this.setButtonOptions();
    this.products = (stocks || []).map((item) => ({ text: item.product, value: item.productId }));
    this.Model = new KardexEntryDto();
    this.Model.movementDate = new Date();
    this.Model.quantity = 1;
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
    const response = await this._kardexService.createEntry(this.Model);
    this.validResponse(response);
  }

  close() {
    this.entityComponent.close();
  }
}
