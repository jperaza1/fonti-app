import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CreateOrUpdateGroupRoleComponent } from '../create-or-update-group-role/create-or-update-group-role.component';
import { GroupRoleDto } from '../dtos/group-role-dto';
import { GroupRoleService } from '../group-role.service';

@Component({
  selector: 'app-list-group-role',
  templateUrl: './list-group-role.component.html',
  styleUrls: ['./list-group-role.component.css']
})
export class ListGroupRoleComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: GroupRoleDto[] = [];
  title: string = "Group Roles";
  disable: boolean = false;
  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateGroupRoleComponent;

  constructor(private _groupRoleService: GroupRoleService) {
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
      },
      {
        dataField: "groupHeader",
        caption: "Group Header",
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
    this.DataSource = await this._groupRoleService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
    try {

    } catch (err) { }
  }

  update(data: GroupRoleDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

}
