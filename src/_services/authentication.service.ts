import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { Auth } from '../_models/auth/auth';
import { ConfigService } from './ConfigService';
import { AuthenticateResponse } from '../_models/auth/AuthenticateResponse';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient,
		private _config: ConfigService) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(userAuth: Auth): Promise<AuthenticateResponse> {
		return this.http.post<AuthenticateResponse>(`${this._config.config.auth}Auth/authenticate`, userAuth).toPromise();
	}

	auth(user: AuthenticateResponse) {
		let currentUserAuth = new User();
		currentUserAuth.token = user.token;
		currentUserAuth.fullName = user.userAuth.fullName;
		currentUserAuth.firstName = user.userAuth.firstName;
		currentUserAuth.lastName = user.userAuth.firstName;
		currentUserAuth.tenantName = user.userAuth.tenantName;
		currentUserAuth.tenantId = user.userAuth.tenantId;
		currentUserAuth.permissions = user.userAuth.permissions;
		currentUserAuth.expiration = user.userAuth.expiration;
		currentUserAuth.userType = user.userAuth.userType;
		currentUserAuth.identity = user.userAuth.identity;
    currentUserAuth.cafeteriaId = user.userAuth.cafeteriaId;
    currentUserAuth.routes = user.userAuth.routes || [];
		localStorage.setItem('currentUser', JSON.stringify(currentUserAuth));
		this.currentUserSubject.next(currentUserAuth);
	}

	logout() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('CONFIGURATIONS');
		this.currentUserSubject.next(null);
	}

	public IsInRole(permission: string): boolean {
		if (!this.currentUserValue)
			return false;
		// return true;
		let permissionUser = this.currentUserValue.permissions;
		return permissionUser.includes(permission);
	}

	public IsInRoleList(permissions?: string[]): boolean {
		if (permissions === null || permissions === undefined || permissions.length <= 0)
			return true;
		// return true;
		return permissions.filter((permission: string) => this.IsInRole(permission)).length > 0;
	}

}