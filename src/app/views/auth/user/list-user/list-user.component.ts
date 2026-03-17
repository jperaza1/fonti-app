import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AppComponentBase } from '../../../../AppComponentBase';
import { CreateOrUpdateUserComponent } from '../create-or-update-user/create-or-update-user.component';
import { UserDto } from '../dtos/user-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: UserDto[] = [];
  title: string = "Users";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateUserComponent;

  constructor(private _userService: UserService) {
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
        dataField: "firstName",
        caption: "FirstName",
        allowEditing: false
      },
      {
        dataField: "lastName",
        caption: "LastName",
        allowEditing: false
      },
      {
        dataField: "email",
        caption: "Email",
        allowEditing: false
      },
      {
        dataField: "userTypeText",
        caption: "User Type",
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
    this.DataSource = await this._userService.getAll();
  }

  create() {
    this.createOrUpdateModal.showAdd();
    try {

    } catch (err) { }
  }

  update(data: UserDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  validResponseDisableEnableAction(requestResult: RequestResult, item: UserDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: UserDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._userService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: UserDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._userService.enable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }

}
