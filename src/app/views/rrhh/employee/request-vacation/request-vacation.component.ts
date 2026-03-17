import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { EmployeeDto } from '../dtos/employee.dto';
import { RequestVacationDto } from '../dtos/request-vacation.dto';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { RequestResult } from '../../../../../_models/RequestResult';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-request-vacation',
  templateUrl: './request-vacation.component.html',
  styleUrls: ['./request-vacation.component.css']
})
export class RequestVacationComponent extends AppComponentBase implements OnInit {
  title: string = "Solicitud de Vacación";
  DxDataSourceRequestType: any = {};
  Model: RequestVacationDto = new RequestVacationDto();

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  OptionButtons: OptionButton[];
  errors: any = {};
  employee: EmployeeDto;
  remainingVacationDays: number = 0;

  constructor(
    private enumDefinitionsService: EnumDefinitionsService,
    private _employeeService: EmployeeService
  ) { 
    super();
  }

  ngOnInit(): void {
  }

  async getRequestTypes() {
    const response = await this.enumDefinitionsService.getRequestType();
    this.DxDataSourceRequestType = this.getDataSourceDx(response);
  }

  async initializeView() {
    this.setButtonOptions();
    await this.getRequestTypes();
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

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    // else
    //   permission.push("TYPES.CREATE");

    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
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

  async save() {
    if (this.remainingVacationDays < 0) {
      const result = await this.confirm(
        'Días insuficientes',
        `Los días restantes de vacaciones serán negativos (${this.remainingVacationDays}). ¿Desea continuar con la solicitud?`,
        true,
        'Sí, continuar',
        'Cancelar'
      );
      if (!result.value) {
        return;
      }
    }

    const response = await this._employeeService.createRequestVacation(this.Model);
    this.validResponse(response);
  }

  close() {
    this.entityComponent.close();
  }


  onDateChanged() {
    if (this.Model.startDate && this.Model.endDate) {
      const start = new Date(this.Model.startDate);
      const end = new Date(this.Model.endDate);

      if (end < start) {
        this.Model.totalDays = 0;
        this.remainingVacationDays = this.employee?.totalVacation ?? 0;
        return;
      }

      const excludeWeekends = this.Model.requestType === 1;
      let days = 0;
      const current = new Date(start);
      while (current <= end) {
        const dayOfWeek = current.getDay();
        if (excludeWeekends) {
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            days++;
          }
        } else {
          days++;
        }
        current.setDate(current.getDate() + 1);
      }

      this.Model.totalDays = days;
    } else {
      this.Model.totalDays = 0;
    }

    this.remainingVacationDays = (this.employee?.totalVacation ?? 0) - this.Model.totalDays;
  }

  onRequestTypeChanged() {
    this.onDateChanged();
  }

  async showAdd(model: EmployeeDto) {
    this.initializeView();
    this.employee = model;
    this.title = "Nuevo Solicitud de Vacación";
    this.Model = new RequestVacationDto();
    this.Model.employeeId = model.id;
    this.Model.employeeName = model.firstName + ' ' + model.lastName;
    this.remainingVacationDays = model.totalVacation ?? 0;
    this.entityComponent.show();
  }

}
