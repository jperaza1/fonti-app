import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { SaleService } from '../sale.service';
import { SaleDto } from '../dtos/sale-dto';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateSaleComponent } from '../create-or-update-sale/create-or-update-sale.component';
import { User } from '../../../../../_models/user';
import { TypeService } from '../../../data/type/type.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { FilterSaleDto } from '../dtos/filter-sale-dto';
import { RouteService } from '../../../data/route/route.service';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css']
})
export class ListSaleComponent extends AppComponentBase implements OnInit {
  DataSource: SaleDto[] = [];
  columns: any[] = [];
  title: string = "Ventas";
  currentUser: User;
  filterModel: FilterSaleDto = new FilterSaleDto();

  DxDataSourceRoute: any = {};
  DxDataSourceSaleType: any = {};

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateSaleComponent;

  constructor(
    private _saleService: SaleService,
    private _routeService: RouteService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _authenticationService: AuthenticationService
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
    this.filterModel.cafeterias = this.currentUser.cafeteriaId ? [this.currentUser.cafeteriaId] : [];
  }

  async ngOnInit() {
    this.initializeColumns();
    await this.initializeView();
    await this.getAll();
  }

  async initializeView() {
    await this.getRoutes();
    await this.getSaleTypes();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
      },
      {
        dataField: "route",
        caption: "Ruta",
      },
      {
        dataField: "vendor",
        caption: "Vendedor",
      },
      {
        dataField: "customerName",
        caption: "Cliente",
      },
      {
        dataField: "saleInvoiceId",
        caption: "Factura",
        width: "180",
        cellTemplate: "invoiceNumberTemplate",
      },
      {
        dataField: "saleDate",
        caption: "Fecha de Venta",
        cellTemplate: "dateTemplate",
      },
      {
        dataField: "saleTypeName",
        caption: "Tipo de Venta",
      },
      {
        dataField: "amount",
        caption: "Monto",
        width: "180",
        cellTemplate: "amountTemplate",
      },
    ]
  }

  async getAll() {
    let result = await this._saleService.getAll(this.filterModel);
    this.DataSource = result;
  }

  create() {
    this.createOrUpdateModal.showAdd();
  }

  update(data: SaleDto) {
    this.createOrUpdateModal.showUpdate(data);
  }

  // Método para formatear fechas usando el TimezoneService
  

  validResponseDisableEnableAction(requestResult: RequestResult, item: SaleDto) {
    if (requestResult.success) {
      item.isActive = !item.isActive;
      this.success(requestResult.messageResponse, requestResult.title);
    } else {
      this.error(requestResult.messageResponse, requestResult.title);
    }
  }

  async disable(data: SaleDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let disableResponse = await this._saleService.disable(data.id);
      this.validResponseDisableEnableAction(disableResponse, data);

    }

  }
  async enable(data: SaleDto) {

    let confirm = await this.confirm();
    if (confirm.value) {

      let enableResponse = await this._saleService.enable(data.id);
      this.validResponseDisableEnableAction(enableResponse, data);

    }
  }

  async getRoutes() {
    let response = await this._routeService.getActives();
    this.DxDataSourceRoute = this.getDataSourceDx(response);
  }

  async getSaleTypes() {
    let response = await this._enumDefinitionsService.getSaleType();
    response.unshift({ value: 0, text: "Todas" } as any);
    this.DxDataSourceSaleType = this.getDataSourceDx(response);
  }
}