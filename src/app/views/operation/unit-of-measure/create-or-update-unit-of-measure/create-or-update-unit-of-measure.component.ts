import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { UnitOfMeasureDto } from '../dtos/unit-of-measure-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { UnitOfMeasureService } from '../unit-of-measure.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-or-update-unit-of-measure',
  templateUrl: './create-or-update-unit-of-measure.component.html',
  styleUrls: ['./create-or-update-unit-of-measure.component.css'],
})
export class CreateOrUpdateUnitOfMeasureComponent extends AppComponentBase implements OnInit {
  Model: UnitOfMeasureDto = new UnitOfMeasureDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Unidad de medida';

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(private _unitOfMeasureService: UnitOfMeasureService) {
    super();
  }

  ngOnInit(): void {}

  initializeView() {
    this.errors = {};
  }

  setButtonOptions() {
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', []),
    ];
  }

  async showUpdate(data: UnitOfMeasureDto) {
    this.title = 'Editar unidad de medida';
    this.initializeView();
    this.setButtonOptions();
    this.Model = await this._unitOfMeasureService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nueva unidad de medida';
    this.initializeView();
    this.setButtonOptions();
    this.Model = new UnitOfMeasureDto();
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
      const createResponse = await this._unitOfMeasureService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._unitOfMeasureService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);
    }
  }

  close() {
    this.entityComponent.close();
  }
}
