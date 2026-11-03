import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductDto } from '../dtos/product-dto';
import { ProductService } from '../product.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { CreateOrUpdateProductComponent } from '../create-or-update-product/create-or-update-product.component';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent extends AppComponentBase implements OnInit {
  columns: any[] = [];
  DataSource: ProductDto[] = [];
  title: string = "Productos";

  @ViewChild("createOrUpdateModal") createOrUpdateModal: CreateOrUpdateProductComponent;

  constructor(
    private _productService: ProductService
  ) { 
    super();
    this.columns = [
      {
        dataField: "id",
        caption: "Actions",
        allowEditing: false,
        width: "120",
        cellTemplate: "actionTemplate",
        alignment: "center",
        allowExporting: false
      },
      {
        dataField: "name",
        caption: "Producto",
        allowEditing: false
      },
      {
        dataField: "productTypeName",
        caption: "Tipo de Producto",
        allowEditing: false
      },
      {
        dataField: "unitOfMeasureName",
        caption: "Unidad",
        allowEditing: false,
        calculateCellValue: (row) => row.productType === 3 ? row.unitOfMeasureName : ""
      },
      {
        dataField: "cost",
        caption: "Costo unitario",
        allowEditing: false,
        format: "#,##0.00",
        calculateCellValue: (row) => row.productType === 3 ? row.cost : null
      },
      {
        dataField: "isActive",
        caption: "Status",
        allowEditing: false,
        width: "120",
        alignment: "center",
        cellTemplate: "statusTemplate",
        allowExporting: true,
        calculateDisplayValue: value => value ? "ACTIVE" : "INACTIVE"
      }
    ];  }

    async ngOnInit() {
      this.getAll();
    }
  
    async getAll() {
      this.DataSource = await this._productService.getAll();
    }

    create() {
      this.createOrUpdateModal.showAdd();
    }
  
    update(data: ProductDto) {
      this.createOrUpdateModal.showUpdate(data);
    }
  
    validResponseDisableEnableAction(requestResult: RequestResult, item: ProductDto) {
      if (requestResult.success) {
        item.isActive = !item.isActive;
        this.success(requestResult.messageResponse, requestResult.title);
      } else {
        this.error(requestResult.messageResponse, requestResult.title);
      }
    }
  
    async disable(data: ProductDto) {
  
      let confirm = await this.confirm();
      if (confirm.value) {
  
        let disableResponse = await this._productService.disable(data.id);
        this.validResponseDisableEnableAction(disableResponse, data);
  
      }
  
    }
    async enable(data: ProductDto) {
  
      let confirm = await this.confirm();
      if (confirm.value) {
  
        let enableResponse = await this._productService.enable(data.id);
        this.validResponseDisableEnableAction(enableResponse, data);
  
      }
  
    }
}
