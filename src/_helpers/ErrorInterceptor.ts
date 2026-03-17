import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';
import { AppComponentBase } from '../app/AppComponentBase';
import { Router } from '@angular/router';
@Injectable()
export class ErrorInterceptor extends AppComponentBase implements HttpInterceptor {
	constructor(private authenticationService: AuthenticationService,
		private router: Router,
	) {
		super();
	}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(catchError((err) => {
			if (err.status === 401) {
				this.authenticationService.logout();
				this.router.navigate(['/login']);
			}
			return throwError(err);
		}));
	}
}
