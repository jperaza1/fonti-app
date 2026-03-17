import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { Router } from '@angular/router';
import { PurchaseOrderDto } from '../dtos/purchase-order.dto';
import { PurchaseOrderService } from '../purchase-order.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { UserTypeEnum } from '../../../../../_enums/user-type.enum';
import { User } from '../../../../../_models/user';
import { FilterPurchaseOrderDto } from '../dtos/filter-purchase-order.dto';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { VendorService } from '../../../data/vendor/vendor.service';
@Component({
  selector: 'app-list-purchase-order',
  templateUrl: './list-purchase-order.component.html',
  styleUrls: ['./list-purchase-order.component.css']
})
export class ListPurchaseOrderComponent extends AppComponentBase implements OnInit {
  title: string = 'Ordenes de Compra';
  DataSource: any[] = [];
  columns: any[] = [];
  DxDatasourcePurchaseOrderStatus: any = {};
  DxDatasourceCafeteria: any = {};
  DxDatasourceVendor: any = {};
  currentUser: User;
  filterPurchaseOrderDto: FilterPurchaseOrderDto = new FilterPurchaseOrderDto();
  constructor(
    private _router: Router,
    private _purchaseOrderService: PurchaseOrderService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _cafeteriaService: CafeteriaService,
    private _authenticationService: AuthenticationService,
    private _vendorService: VendorService
  ) { 
    super();
    this.currentUser = this._authenticationService.currentUserValue;
    this.filterPurchaseOrderDto.userType = this.currentUser.userType;
    this.filterPurchaseOrderDto.cafeterias = this.currentUser.cafeteriaId ? [this.currentUser.cafeteriaId] : [];
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: true,
      },
      {
        dataField: 'orderStatus',
        caption: 'Estado',
        cellTemplate: 'orderStatusTemplate'
      },
      {
        dataField: 'reference',
        caption: 'Referencia'
      },
      {
        dataField: 'vendor',
        caption: 'Proveedor'
      },
      {
        dataField: 'typeInoice',
        caption: 'Tipo de Factura'
      },
      {
        dataField: 'cafeteria',
        caption: 'Cafetería'
      },
      {
        dataField: 'date',
        caption: 'Fecha',
        cellTemplate: 'dateTemplate'
      },
      {
        dataField: 'total',
        caption: 'Total',
        cellTemplate: 'amountTemplate'
      },
      {
        dataField: 'hasInvoice',
        caption: 'Factura',
        cellTemplate: 'hasInvoiceTemplate'
      },
      {
        dataField: 'creatorUser',
        caption: 'Creado por',
      },
      {
        dataField: 'approvedUser',
        caption: 'Aprobado por',
      }
    ];
  }

  async ngOnInit() {
    this.initializeColumns();
    await this.getCafeteria();
    await this.getVendor();
    await this.getPurchaseOrderStatus();
    this.getAll();
  }

  async getAll() {
    
    this.DataSource = await this._purchaseOrderService.getAll(this.filterPurchaseOrderDto);
    
  }

  async getPurchaseOrderStatus() {
    let purchaseOrderStatus = await this._enumDefinitionsService.getPurchaseOrderStatus();
    purchaseOrderStatus.unshift({
      value: 0,
      text: 'Todos'
    } as any);
    this.DxDatasourcePurchaseOrderStatus = this.getDataSourceDx(purchaseOrderStatus);
  }

  onClickNew() {
    window.open('/purchase-order/create', '_blank');
  }

  async onClickRefresh() {
    this.getAll();
  }

  async onClickView(data: PurchaseOrderDto) {
    let file = await this._purchaseOrderService.getPurchaseOrderFile(data.id);
    this.openPdfInNewTab(file, `Orden de Compra ${data.reference}.pdf`);
  }

  update(data: PurchaseOrderDto) {
    window.open(`/purchase-order/update/${data.id}`, '_blank');
  }

  async getCafeteria() {
    let result = await this._cafeteriaService.getActives();
    this.DxDatasourceCafeteria = this.getDataSourceDx(result);
  }

  async getVendor() {
    let result = await this._vendorService.getActives();
    result.unshift({
      id: 0,
      name: 'Todos'
    } as any);
    this.DxDatasourceVendor = this.getDataSourceDx(result);
  }


}
