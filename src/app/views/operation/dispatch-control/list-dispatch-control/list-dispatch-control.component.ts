import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DispatchControlDto } from '../dtos/dispatch-control.dto';
import { DispatchControlService } from '../dispatch-control.service';
import { Router } from '@angular/router';
import { DispatchControlFilterDto } from '../dtos/dispatch-control-filter.dto';

@Component({
  selector: 'app-list-dispatch-control',
  templateUrl: './list-dispatch-control.component.html',
  styleUrls: ['./list-dispatch-control.component.css']
})
export class ListDispatchControlComponent extends AppComponentBase implements OnInit {

  title: string = 'Control de Salidas';
  DataSource: DispatchControlDto[] = [];
  filterModel: DispatchControlFilterDto = new DispatchControlFilterDto();
  columns: any[] = [];



  constructor(
    private _dispatchControlService: DispatchControlService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.initializeColumns();
    await this.search();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'id',
        caption: 'Acciones',
        allowEditing: false,
        cellTemplate: 'actionTemplate',
        width: 100,
        allowExporting: false,
      },
      {
        dataField: 'route',
        caption: 'Ruta',
      },
      {
        dataField: 'truck',
        caption: 'Camion',
      },
      {
        dataField: 'vendor',
        caption: 'Vendedor',
      },
      {
        dataField: 'dispatchControlDate',
        caption: 'Fecha de Control de Salida',
        cellTemplate: 'dateTemplate',
      },
      {
        dataField: 'statusName',
        caption: 'Estado',
        cellTemplate: 'statusTemplate',
      }
    ];
  }

  async search() {
    const result = await this._dispatchControlService.getAll(this.filterModel);
    this.DataSource = result;
  }

  edit(data: DispatchControlDto) {
    window.open(`/dispatch-control/update/${data.id}`, '_blank');
  }

  showAdd() {
    window.open(`/dispatch-control/create`, '_blank');
  }

  async generateReport() {
    await this._dispatchControlService.generateReport(this.filterModel);
  }

}
