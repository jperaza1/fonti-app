import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserAlertTypeEnum } from '../../../../_enums/user-alert-type.enum';
import { UserAlertPreviewDto } from '../../auth/user/dtos/user-alert-preview-dto';
import { UserService } from '../../auth/user/user.service';
import { OptionButton } from '../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { AppComponentBase } from '../../../AppComponentBase';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { RequestResult } from '../../../../_models/RequestResult';
@Component({
  selector: 'app-alert-preview',
  templateUrl: './alert-preview.component.html',
  styleUrls: ['./alert-preview.component.css']
})
export class AlertPreviewComponent extends AppComponentBase implements OnInit {

  summary: any = {};

  @ViewChild("dynamicGrid") dynamicGrid: DxDataGridComponent;
  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;

  @Output() onModalSave = new EventEmitter<any>();

  OptionButtons: OptionButton[];
  UsertAlertPreview: UserAlertPreviewDto = undefined;

  Title: string = "";
  Label: string = "";
  Count: number = 0;
  UserAlert: number = 0;


  TruckAlerts: number[] = [
    UserAlertTypeEnum.TruckInspectionDateExp,
    UserAlertTypeEnum.TruckTagsExp,
    UserAlertTypeEnum.TruckIftaDateExp,
    UserAlertTypeEnum.TruckRegistrationDateExp,
  ];

  CarrierAlerts: number[] = [
    UserAlertTypeEnum.CarrierAnnualReportCorp,
    UserAlertTypeEnum.CarrierIrp,
    UserAlertTypeEnum.CarrierIfta,
    UserAlertTypeEnum.CarrierFuelTaxes1Q,
    UserAlertTypeEnum.CarrierFuelTaxes2Q,
    UserAlertTypeEnum.CarrierFuelTaxes3Q,
    UserAlertTypeEnum.CarrierFuelTaxes4Q,
    UserAlertTypeEnum.CarrierRoadTaxes,
    UserAlertTypeEnum.CarrierBennialUpdate,
    UserAlertTypeEnum.CarrierReportLLC,
    UserAlertTypeEnum.CarrierPermissionNY,
    UserAlertTypeEnum.CarrierURC,
    UserAlertTypeEnum.CarrierPermissionNM,
    UserAlertTypeEnum.CarrierDraft,
    UserAlertTypeEnum.CarrierAndobaStatus,
    UserAlertTypeEnum.CarrierPoa,
    UserAlertTypeEnum.CarrierBoiFilling,
    UserAlertTypeEnum.CarrierBirthDate,
    UserAlertTypeEnum.ServicesPending,
    UserAlertTypeEnum.ServicesPendingAdmin,
    UserAlertTypeEnum.CallBack,
    UserAlertTypeEnum.CallBackAdmin,
  ]

  TaskAlert: number[] = [
    UserAlertTypeEnum.TaskInProgress,
    UserAlertTypeEnum.TaskPendingToReview,
    UserAlertTypeEnum.CarrierODOperator,
    UserAlertTypeEnum.TaskInProgressAdmin,
    UserAlertTypeEnum.TaskItemNotCompleted
  ]

  constructor(
    private _userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
  }

  onShow(userAlert: number, label: string) {
    this.UserAlert = userAlert;
    this.Label = label;
    this.getPreview();
    this.entityComponent.show();
  }

  setSummary() {
    this.summary = {
      totalItems: [
        {
          column: "total",
          summaryType: "sum",
          customizeText: this.customizeTotalColumn.bind(this)
        }
      ]
    };
  }

  async getPreview() {
    this.UsertAlertPreview = undefined;
    this.UsertAlertPreview = await this._userService.getAlertsPreview(this.UserAlert);
    this.Count = this.UsertAlertPreview.dataList.length;
    this.Title = `${this.Label} (${this.UsertAlertPreview.dataList.length})`;
  }

  viewEmployee(data: any) {
    window.open(`/employee/update/${data.id}`, '_blank');
  }

  async getPreviewWithEmitter() {
    await this.getPreview();
    this.onModalSave.emit({
      userAlert: this.UserAlert,
      count: this.UsertAlertPreview.dataList.length
    });
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "close":
        this.close();
        break;
    }
  }

  close() {
    this.UsertAlertPreview = undefined;
    this.entityComponent.close();
  }

  onPrint(data: any) {
    let host = this.getConfiguration("URL_REPORT");
    let url_ = `${host}Application/DriverApplication?id=${data.id}&token=${4}`;
    window.open(url_, "blank");
  }

  onView(data: any) {
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.getPreviewWithEmitter();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
    }
  }

  viewPurchaseOrder(data: any) {
    window.open(`/purchase-order/update/${data.purchaseOrderId}`, '_blank');
  }

  viewInvoice(data: any) {
    window.open(`/invoice/view/${data.id}`, '_blank');
  }

}
