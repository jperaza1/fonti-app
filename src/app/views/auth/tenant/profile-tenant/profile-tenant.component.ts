import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestResult } from '../../../../../_models/RequestResult';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { TenantDto } from '../dtos/tenant-dto';
import { TenantService } from '../tenant.service';

@Component({
  selector: 'app-profile-tenant',
  templateUrl: './profile-tenant.component.html',
  styleUrls: ['./profile-tenant.component.css']
})
export class ProfileTenantComponent extends AppComponentBase implements OnInit {
  errors: any = {};
  Model: TenantDto = new TenantDto();
  recursiveSelectionEnabled: boolean = true;

  constructor(
    private _tenantService: TenantService,
    private _authenticationUser: AuthenticationService
  ) {
    super();

  }

  ngOnInit() {
    this.init();
    this.getById(this._authenticationUser.currentUserValue.tenantId);
  }

  init() {
    this.errors = [];
  }

  async getById(id: number) {
    this.init();
    this.Model = await this._tenantService.getById(id);
  }


  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.init();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }


  async save() {

    let updateResponse = await this._tenantService.update(this.Model, this.Model.id);
    this.validResponse(updateResponse);

  }

  readPicture(inputFile: any) {
    if (inputFile.target.files && inputFile.target.files[0]) {
      let file = inputFile.target.files[0];
      let reader = new FileReader();
      reader.onload = (e: any) => this.Model.logo = reader.result.toString();
      reader.readAsDataURL(file);
    }
  }
}
