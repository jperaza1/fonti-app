import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy, ViewChild } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { AuthenticationService } from '../../../_services/authentication.service';
import { User } from '../../../_models/user';
import { TenantDto } from '../../views/auth/tenant/dtos/tenant-dto';
import { TenantService } from '../../views/auth/tenant/tenant.service';
import { UserService } from '../../views/auth/user/user.service';
import { UserAlertDataDto } from '../../views/auth/user/dtos/user-alert-data-dto';
import { AlertPreviewComponent } from '../../views/home/alert-preview/alert-preview.component';
import { AppComponentBase } from '../../AppComponentBase';
import { Subscription } from 'rxjs';

@Component({
	selector: 'header',
	templateUrl: './header.component.html'
})
export class HeaderComponent extends AppComponentBase implements OnDestroy {
	Tenant: TenantDto;
  Notification: UserAlertDataDto[];
  total: number = 0;

	@Input() pageSidebarTwo;
	@Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
	@Output() toggleMobileSidebar = new EventEmitter<boolean>();
	@Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
	pageSettings = pageSettings;

	mobileSidebarToggle() {
		this.toggleMobileSidebar.emit(true);
	}
	mobileRightSidebarToggle() {
		this.toggleMobileRightSidebar.emit(true);
	}
	toggleSidebarRight() {
		this.toggleSidebarRightCollapsed.emit(true);
	}

	mobileTopMenuToggle() {
		this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
	}

	mobileMegaMenuToggle() {
		this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
	}

	ngOnDestroy() {
		this.pageSettings.pageMobileTopMenuToggled = false;
		this.pageSettings.pageMobileMegaMenuToggled = false;
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
	}
	currentUser: User;
  private taskSubscription: Subscription;

  @ViewChild("alertPreview") alertPreview: AlertPreviewComponent;

	constructor(
    private _authenticationService: AuthenticationService,
		private _tenantService: TenantService,
    private _userService: UserService,
    ) {
      super();
		this.currentUser = this._authenticationService.currentUserValue;
		if (this.currentUser) {
      this.getTenant();
    }
			
	}

	async logout() {
		this._authenticationService.logout();
		location.reload();
	}

	async getTenant() {
		this.Tenant = await this._tenantService.getById(this.currentUser.tenantId);
	}

  onClickAlert(data: UserAlertDataDto) {
    this.alertPreview.onShow(data.userAlert, data.userAlertName);
  }

}
