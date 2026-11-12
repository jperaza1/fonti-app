import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DispatchControlDto } from '../dtos/dispatch-control.dto';
import { DispatchControlService } from '../dispatch-control.service';
import { Router } from '@angular/router';
import { DispatchControlFilterDto } from '../dtos/dispatch-control-filter.dto';
import { RouteService } from '../../../data/route/route.service';
import { RouteDto } from '../../../data/route/dtos/route-dto';

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
  DxDataSourceRoute: any = {};

  constructor(
    private _dispatchControlService: DispatchControlService,
    private _routeService: RouteService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.initializeColumns();
    try {
      await this.getRoutes();
    } catch {
      this.DxDataSourceRoute = this.getDataSourceDx([{ id: 0, name: 'Todas' } as RouteDto]);
    }
    await this.search();
  }

  async getRoutes() {
    const response = await this._routeService.getActives();
    const routes = (response || []).filter((route) => (route.name || '').trim().toLowerCase() !== 'planta');
    routes.unshift({ id: 0, name: 'Todas' } as RouteDto);
    this.DxDataSourceRoute = this.getDataSourceDx(routes);
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
      },
      {
        dataField: 'productTotals',
        caption: 'Productos',
        cellTemplate: 'productsTemplate',
        allowSorting: false,
        allowFiltering: false,
        allowExporting: false,
        minWidth: 420,
      }
    ];
  }

  showsSold(row: DispatchControlDto): boolean {
    const totals = row && row.productTotals;
    return !!totals && totals.some((total) => total.sold !== null && total.sold !== undefined);
  }

  async search() {
    const result = await this._dispatchControlService.getAll(this.filterModel);
    this.DataSource = result || [];
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
