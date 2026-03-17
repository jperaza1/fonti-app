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
import { CreateOrUpdateInvoiceComponent } from '../create-or-update-invoice/create-or-update-invoice.component';
import { VendorService } from '../../../data/vendor/vendor.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent extends AppComponentBase implements OnInit {
  title: string = 'Facturas';
  DataSource: PurchaseOrderInvoiceDto[] = [];
  columns: any[] = [];
  DxDatasourceInvoiceType: any = {};
  DxDatasourcePaymentType: any = {};
  DxDatasourcePaymentStatus: any = {};
  DxDatasourceCafeteria: any = {};
  DxDatasourceVendor: any = {};
  filterModel: InvoiceFilterDto = new InvoiceFilterDto();
  currentUser: User;

  @ViewChild("createOrUpdate") createOrUpdate: CreateOrUpdateInvoiceComponent;

  constructor(
    private _enumDefinitionsService: EnumDefinitionsService,
    private _invoiceService: InvoiceService,
    private _cafeteriaService: CafeteriaService,
    private _vendorService: VendorService,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
  }

  async ngOnInit() {
    await this.init();
    this.filterModel.cafeteriaId = this.currentUser.cafeteriaId || 0;
  }

  async getInvoiceType() {
    let result = await this._enumDefinitionsService.getInvoiceType();
    console.log(result);
    result.unshift({
      value: 0,
      text: 'Todos'
    });
    this.DxDatasourceInvoiceType = this.getDataSourceDx(result);
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

  async getCafeteria() {
    let result = await this._cafeteriaService.getActives();
    result.unshift({
      id: 0,
      name: 'Todos'
    } as any);
    this.DxDatasourceCafeteria = this.getDataSourceDx(result);
  }

  async init() {
    this.initializeColumns();
    await this.getInvoiceType();
    await this.getPaymentType();
    await this.getPaymentStatus();
    await this.getCafeteria();
    await this.getVendor();
    await this.search();
  }

  async search() {
    let result = await this._invoiceService.getAll(this.filterModel);
    this.DataSource = result;
  }

  viewPurchaseOrder(data: PurchaseOrderInvoiceDto) {
    window.open(`/purchase-order/update/${data.purchaseOrderId}`, '_blank');
  }

  viewInvoice(data: PurchaseOrderInvoiceDto) {
    window.open(`/invoice/view/${data.id}`, '_blank');
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
        dataField: 'cafeteria',
        caption: 'Cafeteria'
      },
      {
        dataField: 'invoiceNumber',
        caption: 'Número de Factura',
        cellTemplate: 'invoiceNumberTemplate'
      },
      {
        dataField: 'purchaseOrder',
        caption: 'Orden de Compra',
        cellTemplate: 'purchaseOrderTemplate'
      },
      {
        dataField: 'paymentTypeName',
        caption: 'Tipo de Pago'
      },
      {
        dataField: 'invoiceTypeName',
        caption: 'Tipo de Factura'
      },
      {
        dataField: 'paymentStatusName',
        caption: 'Estado de Pago',
        cellTemplate: 'paymentStatusTemplate'
      },
      {
        dataField: 'vendor',
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

  showAdd() {
    this.createOrUpdate.showAdd();
  }

}
