import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { AppComponentBase } from '../../AppComponentBase';
import { PwaService } from '../../pwa/pwa.service';
import { UserAlertInfoDto } from '../auth/user/dtos/user-alert-info-dto';
import { UserChartDto } from '../auth/user/dtos/user-chart-info-dto';
import { UserService } from '../auth/user/user.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_models/user';
import { AlertPreviewComponent } from './alert-preview/alert-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends AppComponentBase implements OnInit {

  Login: User;

  UserAlerts: UserAlertInfoDto[] = [];
  UserCharts: UserChartDto[] = [];
  

  @ViewChild("alertPreview") alertPreview: AlertPreviewComponent;

  constructor(private _pwaService: PwaService,
    private _swPush: SwPush,
    private _userService: UserService,
    private _autenticationService: AuthenticationService,
    
    
  ) {
    super();

    this.Login = this._autenticationService.currentUserValue;
  }

  async ngOnInit() {
    this.initAlertsAndCharts();
  }

  initAlertsAndCharts() {
    this.initAlerts();
    
  }

  // async initCharts() {
  //   this.UserCharts = await this._userService.getCharts();
  // }

  async initAlerts() {
    await this.loadAlerts();
    await this.getAlertsCount();
  }

  async getAlertsCount() {
    let counts = await this._userService.getAlertsData();
    for (let count of counts) {
      let alert = this.UserAlerts.find(alert => alert.userAlert == count.userAlert);

      if (alert != null)
        alert.count = count.count;
    }

    this.UserAlerts = this.UserAlerts.filter(alert => alert.count > 0);
  }

  async loadAlerts() {
    this.UserAlerts = await this._userService.getAlertsInfo();
  }


  onClickAlert(data: any) {
    this.alertPreview.onShow(data.userAlert, data.label);
  }

  onPreviewEmitter(data: any) {
    let alert = this.UserAlerts.find(alert => alert.userAlert == data.userAlert);
    alert.count = data.count;
  }

}
