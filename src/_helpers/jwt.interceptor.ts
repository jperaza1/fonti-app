import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { LoaderService } from '../_services/loader.service';
import { UserTypeEnum } from '../_enums/user-type.enum';
import { TimezoneService } from '../app/services/timezone.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

	constructor(
		private authenticationService: AuthenticationService,
		private loaderService: LoaderService,
		private timezoneService: TimezoneService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add authorization header with jwt token if available
		let currentUser = this.authenticationService.currentUserValue;
		if (currentUser && currentUser.token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${currentUser.token}`,
					"App.TenantId": `${currentUser.tenantId}`,
					"Accept": "application/json",
					"Timezone": this.timezoneService.getWindowsTimezone(),
					"App.Routes": currentUser.routes ? currentUser.routes.join(',') : ''
				}
			});
		} else {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer 1234567898765432234543`,
					"App.TenantId": `3`,
					"Accept": "application/json",
					"Timezone": this.timezoneService.getWindowsTimezone(),
					"App.Routes": ''
				}
			});
		}
		this.requests.push(request);
		this.loaderService.isLoading.next(true);

		return new Observable(observer => {
			const subscription = next.handle(request).subscribe({
				next: event => {
					if (event instanceof HttpResponse) {
						this.removeRequest(request);
						observer.next(event);
					}
				},
				error: err => {
					this.removeRequest(request);
					observer.error(err);
				},
				complete: () => {
					this.removeRequest(request);
					observer.complete();
				}
			});

			return () => {
				this.removeRequest(request);
				subscription.unsubscribe();
			};
		});
	}

	removeRequest(req: HttpRequest<any>) {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);
		}
		this.loaderService.isLoading.next(this.requests.length > 0);
	}
}