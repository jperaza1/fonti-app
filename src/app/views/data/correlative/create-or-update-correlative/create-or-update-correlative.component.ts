import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CorrelativeDto } from '../dtos/correlative-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { CorrelativeService } from '../correlative.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-or-update-correlative',
  templateUrl: './create-or-update-correlative.component.html',
  styleUrls: ['./create-or-update-correlative.component.css'],
})
export class CreateOrUpdateCorrelativeComponent
  extends AppComponentBase
  implements OnInit
{
  Model: CorrelativeDto = new CorrelativeDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Correlativo';

  /** Mínimo permitido para «hasta» según «desde». */
  minEndNumber = 0;

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _correlativeService: CorrelativeService) {
    super();
  }

  ngOnInit(): void {}

  setButtonOptions(_update?: boolean | null) {
    this.OptionButtons = [
      new OptionButton(
        'close',
        'Cerrar',
        'btn btn-danger pull-right',
        'fa fa-times'
      ),
      new OptionButton(
        'save',
        'Guardar',
        'btn btn-success pull-right',
        'fa fa-save',
        []
      ),
    ];
  }

  private clearFormState() {
    this.errors = {};
    this.minEndNumber = 0;
  }

  private toDate(value: string | Date | null | undefined): Date {
    if (value == null) {
      return new Date();
    }
    if (value instanceof Date) {
      return isNaN(value.getTime()) ? new Date() : value;
    }
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  private normalizeModelFromApi(model: CorrelativeDto): CorrelativeDto {
    model.startDate = this.toDate(model.startDate as any);
    model.endDate = this.toDate(model.endDate as any);
    this.syncMinEndNumber();
    return model;
  }

  private syncMinEndNumber() {
    const s = this.Model.start;
    this.minEndNumber = typeof s === 'number' && !isNaN(s) && s >= 0 ? s : 0;
    if (
      typeof this.Model.end === 'number' &&
      !isNaN(this.Model.end) &&
      this.Model.end < this.minEndNumber
    ) {
      this.Model.end = this.minEndNumber;
    }
  }

  onStartNumberChanged() {
    this.syncMinEndNumber();
  }

  onStartDateChanged(_e: { value?: Date | string }) {
    const start = this.toDate(this.Model.startDate as any);
    const end = this.toDate(this.Model.endDate as any);
    if (end < start) {
      this.Model.endDate = new Date(start);
    }
  }

  async showUpdate(data: CorrelativeDto) {
    this.title = 'Editar correlativo';
    this.clearFormState();
    this.setButtonOptions(true);
    const raw = await this._correlativeService.getById(data.id);
    this.Model = this.normalizeModelFromApi(raw);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nuevo correlativo';
    this.clearFormState();
    this.setButtonOptions();
    this.Model = new CorrelativeDto();
    this.syncMinEndNumber();
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
      this.errors = requestResult.errors || {};
    }
  }

  private validateClient(): boolean {
    if (this.isEmptyOrNullString((this.Model.cai || '').trim())) {
      this.error('Validación', 'Ingrese el CAI.');
      return false;
    }
    if (this.isEmptyOrNullString((this.Model.establishment || '').trim())) {
      this.error('Validación', 'Ingrese el establecimiento.');
      return false;
    }
    if (this.isEmptyOrNullString((this.Model.emissionPoint || '').trim())) {
      this.error('Validación', 'Ingrese el punto de emisión.');
      return false;
    }
    if (this.isEmptyOrNullString((this.Model.documentType || '').trim())) {
      this.error('Validación', 'Ingrese el tipo de documento.');
      return false;
    }
    const start = Number(this.Model.start);
    const end = Number(this.Model.end);
    if (isNaN(start) || isNaN(end)) {
      this.error('Validación', 'Los números desde/hasta deben ser válidos.');
      return false;
    }
    if (start > end) {
      this.error('Validación', 'El número «desde» no puede ser mayor que «hasta».');
      return false;
    }
    const d0 = this.toDate(this.Model.startDate as any);
    const d1 = this.toDate(this.Model.endDate as any);
    d0.setHours(0, 0, 0, 0);
    d1.setHours(0, 0, 0, 0);
    if (d1 < d0) {
      this.error('Validación', 'La Fecha Limite de Emision no puede ser anterior a la Fecha Solicitud.');
      return false;
    }
    return true;
  }

  async save() {
    if (!this.validateClient()) {
      return;
    }
    if (this.isEmptyOrNullNumber(this.Model.id)) {
      const createResponse = await this._correlativeService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._correlativeService.update(
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
