import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { TruckDto } from '../dtos/truck-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { TruckService } from '../truck.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { RouteService } from '../../route/route.service';

@Component({
  selector: 'app-create-or-update-truck',
  templateUrl: './create-or-update-truck.component.html',
  styleUrls: ['./create-or-update-truck.component.css'],
})
export class CreateOrUpdateTruckComponent extends AppComponentBase implements OnInit {
  Model: TruckDto = new TruckDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Camión';

  DxDataSourceTruckStatus: any = {};
  DxDataSourceRoutes: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _truckService: TruckService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {}

  async initializeView() {
    this.errors = {};
    await this.getTruckStatuses();
    await this.getRoutes();
  }

  async getTruckStatuses() {
    const response = await this._enumDefinitionsService.getTruckStatus();
    this.DxDataSourceTruckStatus = this.getDataSourceDx(response);
  }

  async getRoutes() {
    const response = await this._routeService.getActives();
    this.DxDataSourceRoutes = this.getDataSourceDx(response);
  }

  setButtonOptions(_update?: boolean | null) {
    const permission: string[] = [];
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', permission),
    ];
  }

  async showUpdate(data: TruckDto) {
    this.title = 'Editar Camión';
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._truckService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nuevo Camión';
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new TruckDto();
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
      const createResponse = await this._truckService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._truckService.update(
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
