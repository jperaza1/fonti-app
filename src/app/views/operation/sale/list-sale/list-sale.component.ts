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

  DxDataSourceCafeteria: any = {};
  DxDataSourceSaleType: any = {};
  DxDataSourceCategory: any = {};
  DxDataSourceProductType: any = {};

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateSaleComponent;

  constructor(
    private _saleService: SaleService,
    private _typeService: TypeService,
    private _cafeteriaService: CafeteriaService,
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
    await this.getCafeterias();
    await this.getSaleTypes();
    await this.getCategories();
    await this.getProductTypes();
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
        dataField: "saleDate",
        caption: "Fecha de Venta",
        cellTemplate: "dateTemplate",
      },
      {
        dataField: "amount",
        caption: "Monto",
        width: "180",
        cellTemplate: "amountTemplate",
      },
      {
        dataField: "saleTypeName",
        caption: "Tipo de Venta",
      },
      {
        dataField: "cafeteria",
        caption: "Cafetería",
      },
      {
        dataField: "customer",
        caption: "Cliente",
      },
      {
        dataField: "register",
        caption: "Caja",
      },
      {
        dataField: "category",
        caption: "Categoría",
      },
      {
        dataField: "productType",
        caption: "Proveedor",
      },
      {
        dataField: "servicePeriod",
        caption: "Periodo de Servicio",
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

  async getCafeterias() {
    let response = await this._cafeteriaService.getAll();
    this.DxDataSourceCafeteria = this.getDataSourceDx(response);
  }

  async getSaleTypes() {
    let response = await this._enumDefinitionsService.getSaleType();
    response.unshift({ value: 0, text: "Todas" } as any);
    this.DxDataSourceSaleType = this.getDataSourceDx(response);
  }

  async getCategories() {
    let response = await this._typeService.getAciteTypesByGroupCode("SALE_CATEGORY");
    response.unshift({ id: 0, name: "Todas" } as any);
    this.DxDataSourceCategory = this.getDataSourceDx(response);
  }

  async getProductTypes() {
    let response = await this._typeService.getAciteTypesByGroupCode("SALE_PRODUCT_TYPE");
    response.unshift({ id: 0, name: "Todas" } as any);
    this.DxDataSourceProductType = this.getDataSourceDx(response);
  }
}