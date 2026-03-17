import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { UserService } from '../../../auth/user/user.service';
import { ConfigurationDto } from '../models/configuration-dto';
import { ConfigurationService } from '../configuration.service';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-default-user-task',
  templateUrl: './default-user-task.component.html',
  styleUrls: ['./default-user-task.component.css']
})
export class DefaultUserTaskComponent extends AppComponentBase implements OnInit {

  DxDataSourceUser: any = {};
  Model: ConfigurationDto = new ConfigurationDto();

  constructor(
    private _userService: UserService,
    private _configurationService: ConfigurationService
  ) { 
    super();
  }

  async ngOnInit() {
    await this.getConfig();
    await this.getMembers();
  }

  async getMembers() {
    let users = await this._userService.getActives();
    let result = users.map((item) => {
      return {
        id: item.userId,
        name: `${item.firstName} ${item.lastName}`
      }
    });
    this.DxDataSourceUser = this.getDataSourceDx(result);
  }

  async getConfig() {
    let result = await this._configurationService.getByKey('USER_TASK');
    this.Model = result;
  }

  async save() {
    if(this.Model.id <= 0) {
      let result = await this._configurationService.create(this.Model);
      this.validResponse(result);
    } else {
      let result = await this._configurationService.update(this.Model, this.Model.id);
      this.validResponse(result);
    }
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
    }
  }

}
