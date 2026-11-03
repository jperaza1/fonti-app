import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { KardexEntryDto, ProductStockDto } from '../../kardex/dtos/kardex-dto';
import { KardexService } from '../../kardex/kardex.service';
import { OptionButton } from '../../../shared/models/option-button';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-inventory-movement',
  templateUrl: './inventory-movement.component.html',
  styleUrls: ['./inventory-movement.component.css'],
})
export class InventoryMovementComponent extends AppComponentBase implements OnInit {
  Model: KardexEntryDto = new KardexEntryDto();
  productName: string = '';
  isExit: boolean = false;
  title: string = 'Entrada';
  OptionButtons: OptionButton[];
  errors: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _kardexService: KardexService) {
    super();
  }

  ngOnInit(): void {}

  show(product: ProductStockDto, isExit: boolean) {
    this.errors = {};
    this.isExit = isExit;
    this.productName = product.product;
    const qualityExit = isExit && product.productType === 3;
    this.title = qualityExit
      ? 'Salida por mala calidad de ' + product.product
      : isExit
        ? 'Salida de ' + product.product
        : 'Entrada de ' + product.product;
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', []),
    ];
    this.Model = new KardexEntryDto();
    this.Model.productId = product.productId;
    this.Model.quantity = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.Model.movementDate = today;
    if (qualityExit) {
      this.Model.note = 'Salida por mala calidad';
    }
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
    const response = this.isExit
      ? await this._kardexService.createExit(this.Model)
      : await this._kardexService.createEntry(this.Model);
    this.validResponse(response);
  }

  close() {
    this.entityComponent.close();
  }
}
