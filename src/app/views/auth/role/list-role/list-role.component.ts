import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CreateOrUpdateRoleComponent } from '../create-or-update-role/create-or-update-role.component';
import { RoleDto } from '../dtos/role-dto';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent extends AppComponentBase implements OnInit {
  
  columns: any[] = [];
  
  DataSource: RoleDto[] = [];
  
  title: string = "Roles";
  
  disable: boolean = false;

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateRoleComponent;

  constructor(private _roleService: RoleService) {
    super();
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center"
      },
      {
        dataField: "name",
        caption: "Name",
        allowEditing: false
      }, {
        dataField: "description",
        caption: "Description",
        allowEditing: false
      },
      {
        dataField: "isActive",
        caption: "Status",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate"
      }
    ];
  }

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.DataSource = await this._roleService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
    try {

    } catch (err) { }
  }

  update(data: RoleDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

}
