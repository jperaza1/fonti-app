import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { LogsService } from '../../../../../_services/logs.service';

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.css']
})
export class ListLogsComponent extends AppComponentBase implements OnInit {

  @Input() Entity: string;
  @Input() EntityId: number;
  columns: any[] = [];

  DataSource = [];

  constructor(
    private _logService: LogsService
  ) { 
    super()
  }

  async ngOnInit() {
    this.columns = [
      {
        dataField: "log",
        caption: "Log",
        allowEditing: false,
      },
      {
        dataField: "creatorUser",
        caption: "User",
        allowEditing: false,
      },
      {
        dataField: "date",
        caption: "Creation Time",
        allowEditing: false,
        cellTemplate: "dateTemplate",
      }
    ];
    await this.getLogs();
  }

  async getLogs() {
    let result = await this._logService.getByEntity(this.Entity, this.EntityId);
    this.DataSource = result;
  }

}
