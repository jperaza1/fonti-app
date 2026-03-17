import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ModalWithOptionButtonsComponent } from '../modal-with-option-buttons/modal-with-option-buttons.component';
import { DxDataGridComponent } from 'devextreme-angular';
import { OptionButton } from '../../models/option-button';

@Component({
  selector: 'app-app-chart-preview',
  templateUrl: './app-chart-preview.component.html',
  styleUrls: ['./app-chart-preview.component.css']
})
export class AppChartPreviewComponent extends AppComponentBase implements OnInit {
  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @ViewChild("infoGrid") infoGrid: DxDataGridComponent;
  
  OptionButtons: OptionButton[];
  Title: string = "";
  DataSource: any[] = [];
  columns: any[] = [];
  showYear: boolean = false;

  constructor() { 
    super();
  }

  ngOnInit(): void {
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
    ];
  }

  close(): void {
    this.entityComponent.close();
  }

  onShow(data: any[], columns: any[], label: string, showYear: boolean = false): void {
    this.Title = label;
    this.DataSource = data;
    this.columns = columns;
    this.showYear = showYear;
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton): void {
    switch ($event.btnName) {
      case "close":
        this.close();
        break;
    }
  }

  onView(data: any) {
    window.open(`/carrier/update/${data.id}`, '_blank');
  }

  

}
