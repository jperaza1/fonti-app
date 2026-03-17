import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import pageSettings from '../../../config/page-settings';
import { Auth } from '../../../../_models/auth/auth';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { AppComponentBase } from '../../../AppComponentBase';
import { AuthenticateResponse } from '../../../../_models/auth/AuthenticateResponse';
import { ConfigurationService } from '../../../views/gen/configuration/configuration.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'login-v2',
	templateUrl: './login-v2.html',
	styleUrls: ['./login-v2.css']
})

export class LoginV2Page extends AppComponentBase implements OnInit, OnDestroy {
	pageSettings = pageSettings;
	UserAuth: Auth = new Auth();
	isPermission: boolean = false;
  isDarkMode = true;

	constructor(private router: Router,
		private _authenticationService: AuthenticationService,
		private _configurationService: ConfigurationService) {
		super();
		this.pageSettings.pageEmpty = true;
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme ? savedTheme === 'dark' : true;
	}

	ngOnDestroy() {
		this.pageSettings.pageEmpty = false;
	}

	ngOnInit() {
	}

	async formSubmit() {
		let loginResult = await this._authenticationService.login(this.UserAuth);
		if (loginResult.success) {
			this.validatePermissionGeo(loginResult);
		} else {
			this.error("Login", loginResult.errorMessage);
		}
	}

  onThemeChange() {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

	validatePermissionGeo(loginResult: AuthenticateResponse) {

		// if (loginResult.userAuth.userType === 2) {
		// 	if (!navigator.geolocation) {
		// 		this.notPermission();
		// 	}
		// 	navigator.geolocation.getCurrentPosition((position) => {
		// 		this.goHome(loginResult);
		// 	}, (error) => {
		// 		switch (error.code) {
		// 			case error.PERMISSION_DENIED:
		// 				this.notPermission();
		// 				break;
		// 			case error.POSITION_UNAVAILABLE:
		// 				console.log("Location information is unavailable.")
		// 				break;
		// 			case error.TIMEOUT:
		// 				console.log("The request to get user location timed out.")
		// 				break;
		// 		}
		// 	});
		// } else {
		this.goHome(loginResult);
		// }
	}

	async goHome(loginResult: AuthenticateResponse) {
		this._authenticationService.auth(loginResult);
		let configurations = await this._configurationService.getActives();
		localStorage.setItem('CONFIGURATIONS', JSON.stringify(configurations))
		this.router.navigate(['home']);
	}

	notPermission() {
		this.error("Login", "Please review configuration web site permission or clear cache for this site.");
	}

}
