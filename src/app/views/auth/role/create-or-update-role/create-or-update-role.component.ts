import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxTreeListComponent } from 'devextreme-angular';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from '../../../shared/models/option-button';
import { PermissionGroupedDto } from '../../group-role/dtos/permission-grouped-dto';
import { GroupRoleService } from '../../group-role/group-role.service';
import { RoleDto } from '../dtos/role-dto';
import { RoleService } from '../role.service';
import CheckBox from "devextreme/ui/check_box";

@Component({
  selector: 'app-create-or-update-role',
  templateUrl: './create-or-update-role.component.html',
  styleUrls: ['./create-or-update-role.component.css']
})
export class CreateOrUpdateRoleComponent extends AppComponentBase implements OnInit {

  recursiveSelectionEnabled: boolean = true;

  OptionButtons: OptionButton[];

  errors: any = {};

  Model: RoleDto = new RoleDto();

  @ViewChild("treeListPermission") treeListPermission: DxTreeListComponent;

  DxDataSourceGroupHeader: any = {};

  Permissions: PermissionGroupedDto[] = [];
  SelectedRowKeys: string[] = [];

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _groupRoleService: GroupRoleService,
    private _roleService: RoleService
  ) {
    super();
  }

  ngOnInit() {
    this.getPermissions();
    this.getGroupRoles();
  }
  init() {
    this.Model = new RoleDto();
    this.SelectedRowKeys = [];
  }
  async getPermissions() {
    this.Permissions = await this._groupRoleService.getPermissionsGroupedByTenant();
  }
  async getGroupRoles() {
    let options = await this._groupRoleService.getAll();
    this.DxDataSourceGroupHeader = this.getDataSourceDx(options);
  }


  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("ROLE.UPDATE");
    // else
    //   permission.push("ROLE.CREATE");
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

  async showUpdate(data: RoleDto) {
    this.init();
    this.setButtonOptions(true);
    this.Model = await this._roleService.getById(data.id);
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

    this.Model.permissions = this.treeListPermission
      .instance
      .getSelectedRowsData()
      .filter(c => c.permissionId != null).map(c => c.permissionId);

    if (this.isEmptyOrNullNumber(this.Model.id)) {

      let createResponse = await this._roleService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._roleService.update(this.Model);
      this.validResponse(updateResponse);

    }
  }
  close() {
    this.entityComponent.close();
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

  onCellPrepared(e) {
    let that = this;
    if (e.columnIndex === 0 && e.row && e.row.rowType === "data") {
      var isSelected = e.row.isSelected,
        allChildrenCount = 0,
        allSelectedCount = 0;

      this.foreachNodes(e.row.node.children, function (node) {
        if (!node.children.length) {
          allChildrenCount++;
          if (e.component.isRowSelected(node.key)) {
            allSelectedCount++;
          }
        }
      });

      var newIsSelected;

      if (allChildrenCount === 0) {
        newIsSelected = isSelected;
      } else if (allSelectedCount === 0) {
        newIsSelected = false;
      } else if (allSelectedCount === allChildrenCount) {
        newIsSelected = true;
      }
      if (isSelected !== newIsSelected) {
        e.component._skipChildrenProcessing = e.component._skipChildrenProcessing || 0;
        e.component._skipChildrenProcessing++
        new Promise((resolve, reject) => {
          if (!isSelected !== !newIsSelected) {
            if (newIsSelected) {
              resolve(e.component.selectRows(e.row.key, true));
            } else {
              resolve(e.component.deselectRows(e.row.key));
            }
          }
          else
            resolve();
        }).then(function () {

          if (newIsSelected === undefined) {
            setTimeout(() => {
              var elements = e.cellElement.querySelectorAll(".dx-select-checkbox")
              elements.forEach((el) => {
                var instance = CheckBox.getInstance(el);
                if (instance)
                  instance.option("value", undefined);
              })
            });
          }
          e.component._skipChildrenProcessing--;
        });
      }
    }
  }
}
