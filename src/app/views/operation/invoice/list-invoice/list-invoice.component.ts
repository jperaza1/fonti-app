import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { InvoiceFilterDto } from '../dtos/invoice-filter.dto';
import { PurchaseOrderInvoiceDto } from '../dtos/purchase-order-invoice.dto';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { InvoiceService } from '../invoice.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { Router } from '@angular/router';
import { User } from '../../../../../_models/user';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { VendorService } from '../../../data/vendor/vendor.service';
import { RouteService } from '../../../data/route/route.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent extends AppComponentBase implements OnInit {
  title: string = 'Facturas';
  DataSource: PurchaseOrderInvoiceDto[] = [];
  columns: any[] = [];
  DxDatasourcePaymentType: any = {};
  DxDatasourcePaymentStatus: any = {};
  DxDatasourceVendor: any = {};
  DxDatasourceRoute: any = {};
  filterModel: InvoiceFilterDto = new InvoiceFilterDto();
  currentUser: User;
  
  constructor(
    private _enumDefinitionsService: EnumDefinitionsService,
    private _invoiceService: InvoiceService,
    private _routeService: RouteService,
    private _vendorService: VendorService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
  }

  async ngOnInit() {
    await this.init();
  }

  async getPaymentType() {
    let result = await this._enumDefinitionsService.getPaymentType();
    console.log(result);
    result.unshift({
      value: 0,
      text: 'Todos'
    });
    this.DxDatasourcePaymentType = this.getDataSourceDx(result);
  }

  async getVendor() {
    let result = await this._vendorService.getActives();
    result.unshift({
      id: 0,
      name: 'Todos'
    } as any);
    this.DxDatasourceVendor = this.getDataSourceDx(result);
  }

  async getPaymentStatus() {
    let result =  await this._enumDefinitionsService.getPaymentStatus();
    console.log(result);
    result.unshift({
      value: 0,
      text: 'Todos'
    });
    this.DxDatasourcePaymentStatus = this.getDataSourceDx(result);
  }

  async getRoute() {
    let result = await this._routeService.getActives();
    result.unshift({
      id: 0,
      name: 'Todos'
    } as any);
    this.DxDatasourceRoute = this.getDataSourceDx(result);
  }

  async init() {
    this.initializeColumns();
    await this.getPaymentType();
    await this.getPaymentStatus();
    await this.getRoute();
    await this.getVendor();
    await this.search();
  }

  async search() {
    let result = await this._invoiceService.getAll(this.filterModel);
    this.DataSource = result;
  }

  viewInvoice(data: PurchaseOrderInvoiceDto) {
    window.open(`/invoice/view/${data.id}`, '_blank');
  }

  async deleteInvoice(data: PurchaseOrderInvoiceDto) {
    let confirmResult = await this.confirm('¿Estás seguro de querer eliminar esta factura?', 'Eliminar Factura');
    if (confirmResult.value) {
      let disableResponse = await this._invoiceService.delete(data.id);
      if (disableResponse.success) {
        await this.search();
      }
    }
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'route',
        caption: 'Ruta'
      },
      {
        dataField: 'truckName',
        caption: 'Camión'
      },
      {
        dataField: 'invoiceNumber',
        caption: 'Número de Factura',
        cellTemplate: 'invoiceNumberTemplate'
      },
      {
        dataField: 'paymentTypeName',
        caption: 'Tipo de Pago'
      },
      {
        dataField: 'paymentStatusName',
        caption: 'Estado de Pago',
        cellTemplate: 'paymentStatusTemplate'
      },
      {
        dataField: 'vendorName',
        caption: 'Proveedor'
      },
      {
        dataField: 'invoiceDate',
        caption: 'Fecha de Factura',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'dueDate',
        caption: 'Fecha de Vencimiento',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'balance',
        caption: 'Saldo',
        cellTemplate: 'amountTemplate'
      }
    ];
  }

}
