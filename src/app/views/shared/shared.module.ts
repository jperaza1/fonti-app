import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxTemplateModule, DxDataGridModule, DxSelectBoxModule, DxTextBoxModule, DxNumberBoxModule, DxDateBoxModule, DxTextAreaModule, DxAutocompleteModule, DxFileUploaderModule, DxRadioGroupModule, DxTreeListModule, DxCheckBoxModule, DxButtonGroupComponent, DxButtonGroupModule, DxTagBoxModule, DxValidatorModule } from 'devextreme-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PanelComponent } from '../../components/panel/panel.component';
import { ModalWithOptionButtonsComponent } from './components/modal-with-option-buttons/modal-with-option-buttons.component';
import { BasicTableListComponent } from './components/basic-table-list/basic-table-list.component';
import { CustomTableListComponent } from './components/custom-table-list/custom-table-list.component';
import { NgbAccordionModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { NoPanelBasicTableListComponent } from './components/no-panel-basic-table-list/no-panel-basic-table-list.component';
import { PreviewPdfControlComponent } from './components/preview-pdf-control/preview-pdf-control.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CanAccessDirective } from '../../directives/can-access.directive';
import { WebSocketComponent } from './components/web-socket/web-socket.component';
import { ValidatorMessageComponent } from '../../components/validator-message/validator-message.component';
import { DocumentationControlComponent } from './components/documentation-control/documentation-control.component';
import { PreviewDocumentationControlComponent } from './components/preview-documentation-control/preview-documentation-control.component';
import { AlertComponent } from './components/alert/alert.component';
import { CreateDocumentTypeComponent } from './components/create-document-type/create-document-type.component';
import { ListLogsComponent } from './components/list-logs/list-logs.component';
import { BarWithRotatedSeriesChartComponent } from './components/bar-with-rotated-series-chart/bar-with-rotated-series-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { LayeredColumnChartComponent } from './components/layered-column-chart/layered-column-chart.component';
import { AppChartPreviewComponent } from './components/app-chart-preview/app-chart-preview.component';
import { CanNotAccessDirective } from '../../directives/can-not-access.directive';
import { MainPipe } from '../../pipes/main-pipe.module';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
export let AppInjector: Injector;

@NgModule({
	imports: [
		CommonModule,
		DxDataGridModule,
		DxTemplateModule,
		DxSelectBoxModule,
		DxTextBoxModule,
		DxButtonGroupModule,
		DxTemplateModule,
		DxAutocompleteModule,
		DxNumberBoxModule,
		DxDateBoxModule,
		SweetAlert2Module.forRoot(),
		ReactiveFormsModule,
		NgbTabsetModule,
		NgbAccordionModule,
		DxTextAreaModule,
		DxFileUploaderModule,
		DxRadioGroupModule,
		DxTreeListModule,
		DxCheckBoxModule,
    DxPivotGridModule,
		FormsModule,
		SignaturePadModule,
		SignaturePadModule,
		DxTagBoxModule,
		
	],
	declarations: [
		PanelComponent,
		ModalWithOptionButtonsComponent,
		NoPanelBasicTableListComponent,
		BasicTableListComponent,
		CustomTableListComponent,
		PreviewPdfControlComponent,
		CanAccessDirective,
    CanNotAccessDirective,
		WebSocketComponent,
		ValidatorMessageComponent,
		DocumentationControlComponent,
		PreviewDocumentationControlComponent,
		AlertComponent,
		CreateDocumentTypeComponent,
		ListLogsComponent,
		BarWithRotatedSeriesChartComponent,
		PieChartComponent,
		LayeredColumnChartComponent,
		AppChartPreviewComponent,
	],
	exports: [
		CommonModule,
		FormsModule,
		DxDataGridModule,
		DxTemplateModule,
		DxSelectBoxModule,
		DxTextBoxModule,
		DxTemplateModule,
		DxAutocompleteModule,
		DxNumberBoxModule,
		DxDateBoxModule,
		DxFileUploaderModule,
		DxButtonGroupModule,
		SweetAlert2Module,
		PanelComponent,
		ReactiveFormsModule,
		ModalWithOptionButtonsComponent,
		NoPanelBasicTableListComponent,
		BasicTableListComponent,
		CustomTableListComponent,
		NgbTabsetModule,
		NgbAccordionModule,
		DxTextAreaModule,
		DxRadioGroupModule,
		DxCheckBoxModule,
		PreviewPdfControlComponent,
		DxTreeListModule,
		SignaturePadModule,
		CanAccessDirective,
    CanNotAccessDirective,
		WebSocketComponent,
		ValidatorMessageComponent,
		DocumentationControlComponent,
		PreviewDocumentationControlComponent,
		AlertComponent,
		DxTagBoxModule,
		SignaturePadModule,
    ListLogsComponent,
    BarWithRotatedSeriesChartComponent,
    PieChartComponent,
    LayeredColumnChartComponent,
    DxPivotGridModule
	]
})
export class SharedModule { }

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
