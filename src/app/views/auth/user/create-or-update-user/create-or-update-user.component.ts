import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { UserTypeEnum } from '../../../../../_enums/user-type.enum';
import { DefinitionValuesDto } from '../../../../../_models/definitions/definition-values-dto';
import { RequestResult } from '../../../../../_models/RequestResult';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { RoleDto } from '../../role/dtos/role-dto';
import { RoleService } from '../../role/role.service';
import { UserDto } from '../dtos/user-dto';
import { UserService } from '../user.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';

@Component({
  selector: 'app-create-or-update-user',
  templateUrl: './create-or-update-user.component.html',
  styleUrls: ['./create-or-update-user.component.css']
})
export class CreateOrUpdateUserComponent extends AppComponentBase implements OnInit {

  ShowDispatcher: boolean = false;
  ShowDriver: boolean = false;
  ShowCustomer: boolean = false;
  EditModel: boolean = false;

  OptionButtons: OptionButton[];
  errors: any = {};
  Model: UserDto = new UserDto();
  DxDataSourceCity: any = {};
  DxDataSourceUserType: any = {};
  DxDataSourceCafeteria: any = {};

  SelectedRowKeys: number[] = [];
  Roles: RoleDto[] = [];

  SelectedChartKeys: number[] = [];
  SelectedAlertKeys: number[] = [];


  Charts: DefinitionValuesDto[] = [];
  Alerts: DefinitionValuesDto[] = [];


  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;

  @ViewChild("RoleGrid") RoleGrid: DxDataGridComponent;
  @ViewChild("AlertGrid") AlertGrid: DxDataGridComponent;
  @ViewChild("ChartGrid") ChartGrid: DxDataGridComponent;

  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _userService: UserService,
    private _definitionService: EnumDefinitionsService,
    private _roleService: RoleService,
    private _cafeteriaService: CafeteriaService
  ) {
    super();

  }

  async ngOnInit() {
    await this.getUserTypes();
    await this.getAlerts();
    await this.getRoles();
    await this.getCafeterias();
  }

  init() {
    this.EditModel = false;
    this.errors = [];
    this.Model = new UserDto();
    this.Model.userType = UserTypeEnum.General;
    this.SelectedRowKeys = [];
    this.SelectedAlertKeys = [];
    this.SelectedChartKeys = [];
    this.setValuesChangeUserType(this.Model.userType);
  }

  async getRoles() {
    this.Roles = await this._roleService.getAll();
  }
  async getAlerts() {
    this.Alerts = await this._definitionService.getAlerts();
  }

  onItemClickUserType(definition: DefinitionValuesDto) {
    this.setValuesChangeUserType(parseInt(definition.value));
  }
  setValuesChangeUserType(userType: number) {
    this.ShowCustomer = UserTypeEnum.Supervisor === userType || UserTypeEnum.Warehouse === userType || UserTypeEnum.Sales === userType || UserTypeEnum.SpecialService === userType;
  }

  async getUserTypes() {
    let userTypes = await this._definitionService.getUserType();
    this.DxDataSourceUserType = this.getDataSourceDx(userTypes);
  }

  async getCafeterias() {
    var result = await this._cafeteriaService.getAll();
    this.DxDataSourceCafeteria = this.getDataSourceDx(result);
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  showAdd() {
    this.init();
    this.setButtonOptions();
    this.entityComponent.show();
  }
  async showUpdate(data: UserDto) {
    this.init();
    this.setButtonOptions(true);
    this.EditModel = true;
    this.Model = await this._userService.getById(data.id);
    this.SelectedRowKeys = this.Model.roleIds;
    this.SelectedChartKeys = this.Model.userCharts;
    this.SelectedAlertKeys = this.Model.userAlerts;
    this.setValuesChangeUserType(this.Model.userType);
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

  async save() {

    this.Model.roleIds = this.SelectedRowKeys;
    this.Model.userAlerts = this.SelectedAlertKeys;

    if (this.isEmptyOrNullNumber(this.Model.id)) {

      let createResponse = await this._userService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._userService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }
  close() {
    this.entityComponent.close();
  }
}
