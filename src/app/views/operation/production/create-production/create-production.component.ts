import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { RequestResult } from '../../../../../_models/RequestResult';
import { TypeService } from '../../../data/type/type.service';
import { TypeDto } from '../../../data/type/dtos/type-dto';
import { ProductionService } from '../production.service';
import {
  CreateProductionDto,
  CreateProductionLineDto,
  ProductionDto,
  ProductionLineDto,
  ProductionLossDto,
  ProductionProductDto,
} from '../dtos/production-dto';

@Component({
  selector: 'app-create-production',
  templateUrl: './create-production.component.html',
  styleUrls: ['./create-production.component.css'],
})
export class CreateProductionComponent extends AppComponentBase {
  title: string = 'Turno de producción';
  Model: CreateProductionDto = new CreateProductionDto();
  shifts: TypeDto[] = [];
  products: ProductionProductDto[] = [];
  currentShift: ProductionDto = null;
  existingLines: ProductionLineDto[] = [];
  shiftMessage: string = '';
  lockedToOpen = false;
  OptionButtons: OptionButton[];
  errors: any = {};
  private loadingShift = false;

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _productionService: ProductionService,
    private _typeService: TypeService
  ) {
    super();
  }

  async show(shift?: ProductionDto) {
    this.loadingShift = true;
    this.errors = {};
    this.currentShift = null;
    this.existingLines = [];
    this.shiftMessage = '';
    this.lockedToOpen = false;
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
    ];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.Model = new CreateProductionDto();
    this.Model.productionDate = shift ? new Date(shift.productionDate) : today;
    this.Model.shiftTypeId = shift ? shift.shiftTypeId : null;
    this.Model.lines = [];
    this.shifts = (await this._typeService.getAciteTypesByGroupCode('PRODUCTION_SHIFT')) || [];
    this.products = (await this._productionService.getProducts()) || [];
    if (!shift) {
      const open = await this._productionService.getOpen();
      if (open && open.id && open.isActive && !open.isClosed) {
        this.Model.productionDate = new Date(open.productionDate);
        this.Model.shiftTypeId = open.shiftTypeId;
        this.lockedToOpen = true;
      }
    }
    this.addLine();
    this.entityComponent.show();
    this.loadingShift = false;
    await this.loadShift();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'save':
        this.save();
        break;
      case 'finish':
        this.finishShift();
        break;
      case 'close':
        this.close();
        break;
    }
  }

  async loadShift() {
    this.currentShift = null;
    this.existingLines = [];
    this.shiftMessage = '';
    if (!this.Model.productionDate || !this.Model.shiftTypeId) {
      this.refreshButtons();
      return;
    }

    const shift = await this._productionService.getByDay(this.dateParam(this.Model.productionDate), this.Model.shiftTypeId);
    if (!shift || !shift.id) {
      this.shiftMessage = 'Al guardar se abre este turno. No se puede abrir otro hasta cerrarlo.';
      this.refreshButtons();
      return;
    }

    this.currentShift = shift;
    this.existingLines = shift.lines || [];
    if (!shift.isActive) {
      this.shiftMessage = 'Este turno ya fue anulado y no se puede volver a abrir en esta fecha.';
    } else if (shift.isClosed) {
      this.shiftMessage = 'Este turno ya está cerrado. No se pueden agregar líneas.';
    } else {
      this.shiftMessage = 'Este turno está abierto. Las líneas nuevas se agregan aquí. Ciérralo para poder abrir otro turno.';
    }
    this.refreshButtons();
  }

  onHeaderChanged() {
    if (this.loadingShift) {
      return;
    }
    this.loadShift();
  }

  addLine() {
    const line = new CreateProductionLineDto();
    line.quantity = 1;
    line.losses = [];
    line.consumption = [];
    this.Model.lines.push(line);
  }

  removeLine(index: number) {
    this.Model.lines.splice(index, 1);
  }

  async preview(line: CreateProductionLineDto) {
    const previous = new Map((line.losses || []).map((loss) => [loss.productId, loss.quantity]));
    line.consumption = [];
    line.losses = [];
    if (!line.productId || !line.quantity || line.quantity <= 0) {
      return;
    }

    const response = await this._productionService.getConsumption(line.productId, line.quantity);
    if (!Array.isArray(response)) {
      this.errors = response.errors;
      return;
    }

    line.consumption = response;
    line.losses = response.map((item) => {
      const loss = new ProductionLossDto();
      loss.productId = item.productId;
      loss.product = item.product;
      loss.unitOfMeasure = item.unitOfMeasure;
      loss.quantity = previous.has(item.productId) ? previous.get(item.productId) : null;
      return loss;
    });
  }

  async cancelLine(line: ProductionLineDto) {
    const confirmed = await this.confirm('Anular línea', '¿Anular esta línea? Se revierte su inventario.');
    if (!confirmed.value) {
      return;
    }

    const response = await this._productionService.cancel(line.id);
    if (response.success) {
      this.success(response.title, response.messageResponse);
      await this.loadShift();
      this.modalSave.emit();
      return;
    }

    this.error(response.title, response.messageResponse);
  }

  async save() {
    if (this.currentShift && !this.currentShift.isActive) {
      this.error('Producción', 'Este turno ya fue anulado y no se puede volver a abrir en esta fecha.');
      return;
    }

    if (this.currentShift && this.currentShift.isClosed) {
      this.error('Producción', 'Este turno ya está cerrado.');
      return;
    }

    if (this.currentShift && this.currentShift.isActive && !this.currentShift.isClosed) {
      this.Model.productionShiftId = this.currentShift.id;
    }

    const response = await this._productionService.create(this.Model);
    this.validResponse(response);
  }

  async finishShift() {
    if (!this.currentShift || !this.currentShift.isActive || this.currentShift.isClosed) {
      return;
    }

    const confirmed = await this.confirm(
      'Cerrar turno',
      '¿Cerrar este turno? No se podrán agregar más líneas y se podrá abrir otro turno.'
    );
    if (!confirmed.value) {
      return;
    }

    const response = await this._productionService.closeShift(this.currentShift.id);
    if (response.success) {
      this.success(response.title, response.messageResponse);
      this.modalSave.emit();
      this.close();
      return;
    }

    this.error(response.title, response.messageResponse);
  }

  get headerLocked() {
    if (this.lockedToOpen) {
      return true;
    }
    return !!(this.currentShift && (!this.currentShift.isActive || this.currentShift.isClosed));
  }

  private refreshButtons() {
    const canEdit = !this.currentShift || (this.currentShift.isActive && !this.currentShift.isClosed);
    const buttons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
    ];
    if (this.currentShift && this.currentShift.isActive && !this.currentShift.isClosed) {
      buttons.push(new OptionButton('finish', 'Cerrar turno', 'btn btn-warning pull-right', 'fa fa-lock', ['OPERATION.PRODUCTION.CLOSE']));
    }
    if (canEdit) {
      buttons.push(new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', ['OPERATION.PRODUCTION.CREATE']));
    }
    this.OptionButtons = buttons;
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

  close() {
    this.entityComponent.close();
  }

  private dateParam(date: Date) {
    const value = new Date(date);
    const month = value.getMonth() + 1;
    const day = value.getDate();
    return value.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  }
}
