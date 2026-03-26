// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatTableModule } from '@angular/material';

// Main Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatSubMenuComponent } from './components/float-sub-menu/float-sub-menu.component';
// Component Module
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TrendModule } from 'ngx-trend';
import { HighlightJsModule } from 'ngx-highlight-js';
import { CountdownModule } from 'ngx-countdown';
import { TagInputModule } from 'ngx-chips';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import 'd3';
import 'nvd3';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

import { LoginV2Page } from './pages/login/login-v2/login-v2';

// Helper
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/ErrorInterceptor';

//DevExtreme
import { NgxMaskModule } from 'ngx-mask';
import { LoaderComponent } from './views/loader/loader.component';
import { HomeModule } from './views/home/home.module';
import { ConfigService } from '../_services/ConfigService';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedService } from '../_services/SharedSvc.service';
import { MainPipe } from './pipes/main-pipe.module';


export const configFactory = (configService: ConfigService) => {
	return () => configService.loadConfig();
};

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SidebarComponent,
		SidebarRightComponent,
		TopMenuComponent,
		FooterComponent,
		FloatSubMenuComponent,
		LoginV2Page,
		LoaderComponent
	],
	imports: [
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		CountdownModule,
		FormsModule,
		HighlightJsModule,
		LoadingBarRouterModule,
		MatSortModule,
		MatTableModule,
		NgbModule,
		NgxChartsModule,
		PerfectScrollbarModule,
		ReactiveFormsModule,
		SweetAlert2Module.forRoot(),
		TagInputModule,
		TrendModule,
		NgxMaskModule.forRoot(),
		HomeModule,
    MainPipe,
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
	],
	providers: [Title, {
		provide: PERFECT_SCROLLBAR_CONFIG,
		useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
	},
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{
			provide: APP_INITIALIZER,
			useFactory: configFactory,
			deps: [ConfigService],
			multi: true
		},
		SharedService
	],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
		router.events.subscribe((e) => {
			if (e instanceof NavigationEnd) {
				var title = 'FONTI | ' + this.route.snapshot.firstChild.data['title'];
				this.titleService.setTitle(title);
			}
		});
	}
}
