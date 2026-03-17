import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { GroupRoleDto } from '../dtos/group-role-dto';
import { PermissionDto } from '../dtos/permission-dto';
import { GroupRoleService } from '../group-role.service';

@Component({
  selector: 'app-create-or-update-group-role',
  templateUrl: './create-or-update-group-role.component.html',
  styleUrls: ['./create-or-update-group-role.component.css']
})
export class CreateOrUpdateGroupRoleComponent extends AppComponentBase implements OnInit {
  OptionButtons: OptionButton[];
  errors: any = {};
  Model: GroupRoleDto = new GroupRoleDto();

  @ViewChild("groupRoleGrid") groupRoleGrid: DxDataGridComponent;

  DxDataSourceGroupHeader: any = {};

  Permissions: PermissionDto[] = [];
  SelectedRowKeys: string[] = [];

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _groupRoleService: GroupRoleService
  ) {
    super();
  }

  ngOnInit() {
    this.getPermissions();
    this.getGroupRoles();
  }
  init() {
    this.Model = new GroupRoleDto();
    this.SelectedRowKeys = [];
  }
  async getPermissions() {
    this.Permissions = await this._groupRoleService.getAllPermissions();
  }
  async getGroupRoles() {
    let options = await this._groupRoleService.getAll();
    this.DxDataSourceGroupHeader = this.getDataSourceDx(options);
  }


  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("GROUP_ROLE.UPDATE");
    // else
    //   permission.push("GROUP_ROLE.CREATE");
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
  async showUpdate(data: GroupRoleDto) {
    this.init();
    this.setButtonOptions(true);
    this.Model = await this._groupRoleService.getById(data.id);
    this.SelectedRowKeys = this.Model.permissions.map(c => c.permissionId);
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


    let selection = this.groupRoleGrid.instance.getSelectedRowKeys();

    this.Model.permissions = selection.map(c => {
      return {
        permissionId: c,
        normalizedName: ""
      };
    });

    if (this.isEmptyOrNullNumber(this.Model.id)) {

      let createResponse = await this._groupRoleService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._groupRoleService.update(this.Model);
      this.validResponse(updateResponse);

    }
  }
  close() {
    this.entityComponent.close();
  }
}
