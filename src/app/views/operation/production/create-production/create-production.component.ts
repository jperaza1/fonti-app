import { Component, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { TypeService } from '../../../data/type/type.service';
import { TypeDto } from '../../../data/type/dtos/type-dto';
import { ProductionService } from '../production.service';
import {
  CreateProductionDto,
  ProductionDto,
  ProductionLineDto,
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
  currentShift: ProductionDto = null;
  existingLines: ProductionLineDto[] = [];
  shiftMessage: string = '';
  OptionButtons: OptionButton[];
  errors: any = {};
  private loadingShift = false;

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;

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
    this.entityComponent.show();
    this.loadingShift = false;
    await this.loadShift();
  }

  optionButtonClicked($event: OptionButton) {
    if ($event.btnName === 'close') {
      this.close();
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
      this.refreshButtons();
      return;
    }

    this.currentShift = shift;
    this.existingLines = shift.lines || [];
    if (!shift.isActive) {
      this.shiftMessage = 'Este turno está anulado.';
    } else if (shift.isClosed) {
      this.shiftMessage = 'Este turno está cerrado.';
    } else {
      this.shiftMessage = 'Este turno está abierto.';
    }
    this.refreshButtons();
  }

  onHeaderChanged() {
    if (this.loadingShift) {
      return;
    }
    this.loadShift();
  }

  get headerLocked() {
    return true;
  }

  private refreshButtons() {
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
    ];
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
