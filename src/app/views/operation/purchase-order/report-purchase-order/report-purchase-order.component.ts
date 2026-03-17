import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { FilterPurchaseOrderDto } from '../dtos/filter-purchase-order.dto';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { VendorService } from '../../../data/vendor/vendor.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { PurchaseOrderService } from '../purchase-order.service';
import { DxPivotGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-report-purchase-order',
  templateUrl: './report-purchase-order.component.html',
  styleUrls: ['./report-purchase-order.component.css']
})
export class ReportPurchaseOrderComponent extends AppComponentBase implements OnInit {

  title: string = 'Reporte de Ordenes de Compra';
  filterPurchaseOrderDto: FilterPurchaseOrderDto = new FilterPurchaseOrderDto();
  DataSource: any[] = [];
  DxDatasourcePurchaseOrderStatus: any = {};
  DxDatasourceCafeteria: any = {};
  DxDatasourceVendor: any = {};
  dataSource: any  [];
  pivotGridDataSource: any = {};

  @ViewChild('pivotGrid') pivotGrid: DxPivotGridComponent;

  constructor(
    private _cafeteriaService: CafeteriaService,
    private _vendorService: VendorService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _purchaseOrderService: PurchaseOrderService
  ) { 
    super();
  }

  async generateReport() {
    this.DataSource = await this._purchaseOrderService.getPivot(this.filterPurchaseOrderDto);
    this.pivotGridDataSource = {
      fields: [
        {
          caption: 'Cafeteria',
          width: 120,
          dataField: 'cafeteria',
          area: 'row',
          sortBySummaryField: 'Total',
        }, 
        {
          dataField: 'date',
          dataType: 'date',
          caption: 'Fecha',
          area: 'column',
        },
        {
          caption: 'Proveedor',
          dataField: 'vendor',
          area: 'column',
        },
        {
          caption: 'Costo',
          dataField: 'costRecived',
          dataType: 'number',
          summaryType: 'sum',
          area: 'data',
          customizeText: function(cellInfo) {
            if (cellInfo.value) {
              return 'L. ' + cellInfo.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return 'L. 0.00';
          },
        },
        {
          groupName: 'date',
          groupInterval: 'day',
          visible: false,
        }, 
        {
          caption: 'Total Recibido',
          dataField: 'totalRecived',
          dataType: 'number',
          summaryType: 'sum',
          customizeText: function(cellInfo) {
            if (cellInfo.value) {
              return 'L. ' + cellInfo.value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            return 'L. 0.00';
          },
          area: 'data',
        }, 
        {
          caption: 'Cantidad',
          dataField: 'quantityRecived',
          dataType: 'number',
          summaryType: 'sum',
          area: 'data',
        },
      ],
      store: this.DataSource,
    };
    console.log(this.pivotGrid);
    // Refrescar el pivot grid
    if (this.pivotGrid) {
      this.pivotGrid.instance.repaint();
    }
    
    console.log(this.pivotGridDataSource);
    console.log(this.DataSource);
  }

  async ngOnInit() {
    //this.initializeColumns();
    await this.getPurchaseOrderStatus();
    await this.getCafeteria();
    await this.getVendor();

    this.generateReport();
  }

  initializeColumns() {
    
  }

  async getPurchaseOrderStatus() {
    let purchaseOrderStatus = await this._enumDefinitionsService.getPurchaseOrderStatus();
    purchaseOrderStatus.unshift({
      value: 0,
      text: 'Todos'
    } as any);
    this.DxDatasourcePurchaseOrderStatus = this.getDataSourceDx(purchaseOrderStatus);
  }

  async getCafeteria() {
    let result = await this._cafeteriaService.getActives();
    result.unshift({
      id: 0,
      name: 'Todos'
    } as any);
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
