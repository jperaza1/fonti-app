import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';
import { AlertPreviewComponent } from './alert-preview/alert-preview.component';
import { GraphicPreviewComponent } from './graphic-preview/graphic-preview.component';


@NgModule({
	imports: [
		SharedModule,
		HomeRoutingModule,
	],
	declarations: [HomeComponent, AlertPreviewComponent, GraphicPreviewComponent],
	providers: [],
	exports: [
    AlertPreviewComponent
  ]
})
export class HomeModule { }