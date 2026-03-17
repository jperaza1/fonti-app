import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserAlertTypeEnum } from '../../../../_enums/user-alert-type.enum';
import { DefinitionValuesDto } from '../../../../_models/definitions/definition-values-dto';
import { RequestResult } from '../../../../_models/RequestResult';
import { EnumDefinitionsService } from '../../../../_services/enum-definitions.service';
import { AppComponentBase } from '../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../shared/models/option-button';
import { AlertEmailDto } from '../dtos/alert-email-dto';
import ArrayStore from 'devextreme/data/array_store';
import { ClipboardService } from 'ngx-clipboard';
import { AlerEmailService } from '../alert-email.services';

@Component({
  selector: 'app-create-or-update-alert-email',
  templateUrl: './create-or-update-alert-email.component.html',
  styleUrls: ['./create-or-update-alert-email.component.css']
})
export class CreateOrUpdateAlertEmailComponent extends AppComponentBase implements OnInit {
  Model: AlertEmailDto = new AlertEmailDto();
  OptionButtons: OptionButton[];
  errors: any = {};

  AlertByOptions: string[] = ["Truck", "Product By Truck", "Carrier", "Holiday"];
  //AlertByOptions: string[] = ["Truck", "Product By Truck", "Driver", "Carrier"];

  NotifyDaysOptions: any = new ArrayStore({
    data: [
      { value: 1, text: "1" }, { value: 2, text: "2" },
      { value: 3, text: "3" }, { value: 4, text: "4" },
      { value: 5, text: "5" }, { value: 10, text: "10" },
      { value: 15, text: "15" }, { value: 20, text: "20" },
      { value: 25, text: "25" }, { value: 30, text: "30" },
      { value: 40, text: "40" }, { value: 45, text: "45" }
    ],
    key: 'value',
  });

  // DriverFields: string[] = ["_CarrierName_", "_DriverFirstName_", "_DriverLastName_", "_DateExpType_"];
  TruckFields: string[] = ["_CarrierName_", "_UnitNumber_", "_DateExpType_"];
  ProductTruckFields: string[] = ["_CarrierName_", "_UnitNumber_", "_ProductName_", "_ExpireDay_", "_ProductExpirationDate_"];
  CarrierFields: string[] = ["_CarrierName_", "_ProductName_", "_ExpireDay_"];
  HolidayFields: string[] = ["_CarrierName_"];
  Fields: string[] = [];

  Alerts: DefinitionValuesDto[] = [];
  AlertsByType: any = {};
  CustomerType: any = {};

  TruckAlerts: number[] = [
    UserAlertTypeEnum.TruckInspectionDateExp,
    UserAlertTypeEnum.TruckTagsExp,
    UserAlertTypeEnum.TruckIftaDateExp,
    UserAlertTypeEnum.TruckRegistrationDateExp,
  ];

  ProductByTruckAlerts: number[] = [
    UserAlertTypeEnum.CarrierPermitRvwNm,
    UserAlertTypeEnum.CarrierPermitRNWNY,
    UserAlertTypeEnum.CarrierFuelTaxes1Q,
    UserAlertTypeEnum.CarrierFuelTaxes2Q,
    UserAlertTypeEnum.CarrierFuelTaxes3Q,
    UserAlertTypeEnum.CarrierFuelTaxes4Q,
    UserAlertTypeEnum.CarrierRoadTaxes,
  ]

  CarrierAlerts: number[] = [
    UserAlertTypeEnum.CarrierBirthDate,
    UserAlertTypeEnum.CarrierAnnualReportCorp,
    UserAlertTypeEnum.CarrierReportLLC,
    UserAlertTypeEnum.CarrierURC,
    UserAlertTypeEnum.CarrierBennialUpdate,
    UserAlertTypeEnum.CarrierBoiFilling
  ]

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _enumService: EnumDefinitionsService,
    private _service: AlerEmailService,
    private _clipboardService: ClipboardService
  ) {
    super();
  }

  async ngOnInit() {
    await this.initializeView();
    this.getTypes();
    this.getCarrierType();
  }

  async getTypes() {
    this.Alerts = await this._enumService.getAlerts();
  }

  onItemClickAlertBy(e: any) {
    let options: DefinitionValuesDto[] = [];
    if (this.Model.alertBy == "Truck") {
      options = this.Alerts.filter(x => this.TruckAlerts.includes(x.value));
      this.Fields = this.TruckFields;
    } else if (this.Model.alertBy == "Product By Truck") {
      options = this.Alerts.filter(x => this.ProductByTruckAlerts.includes(x.value));
      this.Fields = this.ProductTruckFields;
    } else if (this.Model.alertBy == "Carrier") {
      options = this.Alerts.filter(x => this.CarrierAlerts.includes(x.value));
      this.Fields = this.CarrierFields;
    } else if (this.Model.alertBy == "Holiday") { 
      this.Fields = this.HolidayFields;
    }
    this.AlertsByType = new ArrayStore({
      data: options,
      key: 'value',
    });
  }

  async initializeView() {
    this.Model = new AlertEmailDto();
    this.errors = {};
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = ['DATA.CARRIERS.CREATE'];
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showUpdate(data: AlertEmailDto) {
    await this.initializeView();
    this.Model = await this._service.getById(data.id);
    this.onItemClickAlertBy({});
    this.setButtonOptions(true);
    this.entityComponent.show();
  }

  async showAdd() {
    await this.initializeView();
    this.setButtonOptions();
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

  copy(data: string) {
    this._clipboardService.copyFromContent(data);
    this.success('', "copied to clipboard");
  }

  async save() {
    if (this.isEmptyOrNullNumber(this.Model.id)) {

      let createResponse = await this._service.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._service.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }


  close() {
    this.entityComponent.close();
  }

  async getCarrierType() {
    let carrierType = await this._enumService.getLeadCustomerType();
    this.CustomerType = this.getDataSourceDx(carrierType);
  }

}
