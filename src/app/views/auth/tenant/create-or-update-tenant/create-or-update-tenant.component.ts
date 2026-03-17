import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { PermissionGroupedDto } from '../../group-role/dtos/permission-grouped-dto';
import { GroupRoleService } from '../../group-role/group-role.service';
import { TenantDto } from '../dtos/tenant-dto';
import { TenantService } from '../tenant.service';
import CheckBox from "devextreme/ui/check_box";
import { DxTreeListComponent } from 'devextreme-angular';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-create-or-update-tenant',
  templateUrl: './create-or-update-tenant.component.html',
  styleUrls: ['./create-or-update-tenant.component.css']
})
export class CreateOrUpdateTenantComponent extends AppComponentBase implements OnInit {
  OptionButtons: OptionButton[];
  errors: any = {};
  Model: TenantDto = new TenantDto();
  recursiveSelectionEnabled: boolean = true;

  Permissions: PermissionGroupedDto[] = [];

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @ViewChild("treeListPermission") treeListPermission: DxTreeListComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _tenantService: TenantService,
    private _groupRoleService: GroupRoleService
  ) {
    super();

  }


  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("COMPANY.UPDATE");
    // else
    //   permission.push("COMPANY.CREATE");
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }


  ngOnInit() {
    this.getPermissions();
  }

  async getPermissions() {
    this.Permissions = await this._groupRoleService.getPermissionsGrouped();
  }

  init() {
    this.errors = [];
  }
  showAdd() {
    this.init();
    this.setButtonOptions();
    this.Model = new TenantDto();
    this.entityComponent.show();
  }
  async showUpdate(data: TenantDto) {
    this.init();
    this.setButtonOptions(true);
    this.Model = await this._tenantService.getById(data.id);
    let keys = this.Model.permissions.map(permission => this.getKeyByPermissionId(permission, this.getItemsDataGrid()));
    this.treeListPermission.instance.deselectAll().then();
    this.treeListPermission.instance.selectRows(keys, false).then();
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

  getKeyByPermissionId(permissionId: string, obj: any[]): number {

    if (obj.filter(c => c.data.permissionId == permissionId).length > 0) {
      let permission = obj.find(c => c.data.permissionId == permissionId);
      return permission.key;
    }

    for (let item of obj) {
      let indx = this.getKeyByPermissionId(permissionId, item.children);
      if (indx == -1)
        continue;
      else
        return indx;
    }
    return -1;
  }

  getItemsDataGrid() {
    return this.treeListPermission.instance.getDataSource().items();
  }

  async save() {

    this.Model.permissions = this.treeListPermission
      .instance
      .getSelectedRowsData()
      .filter(c => c.permissionId != null).map(c => c.permissionId);

    if (this.isEmptyOrNullNumber(this.Model.id)) {

      let createResponse = await this._tenantService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._tenantService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }
  close() {
    this.entityComponent.close();
  }

  readPicture(inputFile: any) {
    if (inputFile.target.files && inputFile.target.files[0]) {
      let file = inputFile.target.files[0];
      let reader = new FileReader();
      reader.onload = (e: any) => this.Model.logo = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }

  selectedRowKeys: number[] = [];

  onSelectionChanged(e: any) {
    let that = this;
    if (e.component._skipChildrenProcessing) return;
    var currentSelectedRowKeys = e.currentSelectedRowKeys;
    var currentDeselectedRowKeys = e.currentDeselectedRowKeys;
    if (currentSelectedRowKeys.length >= 1 || currentDeselectedRowKeys.length >= 1) {
      var isSelect;
      var currentArray;
      if (currentSelectedRowKeys.length) {
        currentArray = currentSelectedRowKeys;
        isSelect = true;
      } else {
        currentArray = currentDeselectedRowKeys;
      }
      currentArray.forEach(function (value, i, array) {
        var key = array[i];
        that.changeNodeSelection(e.component, key, isSelect);
      });
    }
  }

  changeNodeSelection(component, key, isSelect) {
    var rowIndex = component.getRowIndexByKey(key);
    var row = component.getVisibleRows()[rowIndex];
    var childrenKeys = [];
    if (!row) return;
    this.foreachNodes(row.node.children, function (node) {
      childrenKeys.push(node.key);
    });
    (isSelect ? component.selectRows(childrenKeys, true) : component.deselectRows(childrenKeys)).done(function () {
      var node = row.node;
      var parentRowIndexes = [];
      while (node.parent) {
        node = node.parent;
        rowIndex = component.getRowIndexByKey(node.key);
        row = component.getVisibleRows()[rowIndex];
        if (row) {
          parentRowIndexes.push(rowIndex);
        }
      }
      if (parentRowIndexes.length) {
        component.repaintRows(parentRowIndexes);
      }
    });
  }

  foreachNodes(nodes, func) {
    for (var i = 0; i < nodes.length; i++) {
      func(nodes[i]);
      this.foreachNodes(nodes[i].children, func);
    }
  }
}
