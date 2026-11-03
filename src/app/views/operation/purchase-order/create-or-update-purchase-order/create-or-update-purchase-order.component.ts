import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { PurchaseOrderService } from '../purchase-order.service';
import { VendorService } from '../../../data/vendor/vendor.service';
import { ProductService } from '../../../data/product/product.service';
import { PurchaseOrderDetailDto, PurchaseOrderDto } from '../dtos/purchase-order.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VendorDto } from '../../../data/vendor/dtos/vendor-dto';
import { VendorProductDto } from '../../../data/product/dtos/product-dto';
import { DxDataGridComponent } from 'devextreme-angular';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { DetailStatusEnum } from '../../../../../_enums/detail-status.enum';
import Swal, { SweetAlertResult } from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-create-or-update-purchase-order',
  templateUrl: './create-or-update-purchase-order.component.html',
  styleUrls: ['./create-or-update-purchase-order.component.css']
})
export class CreateOrUpdatePurchaseOrderComponent extends AppComponentBase implements OnInit {

  Model: PurchaseOrderDto = new PurchaseOrderDto();
  DxDataSourceInvoiceType: any = {};
  Products: VendorProductDto[] = [];
  ModelProducts: any[] = [];
  errors: any = {};

  title: string = 'Nueva Orden de Compra';

  DxDataSourceVendor: any = {};
  DxDataSourceProduct: any = {};
  DxDataSourceDetailStatus: any = {};
  routeSub: Subscription;

  id: number
  @ViewChild('dataGrid', { static: false }) dataGrid: DxDataGridComponent;

  constructor(
    private _purchaseOrderService: PurchaseOrderService,
    private _vendorService: VendorService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _enumService: EnumDefinitionsService
  ) {
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id']
    });
    console.log(this._authenticationService.IsInRole('OPERATION.PURCHASE_ORDER.UPDATE_INVOICE_TYPE'));
  }

  async ngOnInit() {
    await this.initializeView();
    this.routeSub.unsubscribe();
    if(this.id > 0) await this.showUpdate(this.id);
  }

  async recalculateDataGrid() {
    for(let detail of this.Model.details) {
      detail.subTotal = this.roundTo(detail.cost * detail.quantity, 3);
      detail.discount = this.roundTo(detail.discountPercentage >= 1 ? (detail.quantity * detail.discountPercentage): detail.subTotal * detail.discountPercentage, 3);
      detail.tax = this.roundTo((detail.subTotal - detail.discount) * detail.taxPercentage, 3);
      detail.total = this.roundTo(detail.subTotal + detail.tax - detail.discount, 3);

      detail.subTotalRecived = this.roundTo(detail.quantityRecived * detail.costRecived, 3);
      detail.discountRecived = this.roundTo(detail.discountPercentage >= 1 ? (detail.quantityRecived * detail.discountPercentage): detail.subTotalRecived * detail.discountPercentage, 3);
      detail.taxRecived = this.roundTo((detail.subTotalRecived - detail.discountRecived) * detail.taxPercentage, 3);
      detail.totalRecived = this.roundTo(detail.subTotalRecived + detail.taxRecived - detail.discountRecived, 3);
      //this.refreshDataGrid();
    }
    this.dataGrid.instance.refresh();
  }

  onItemClickVendor(itemData: any) {
    this.Model.vendor = itemData.name;
  }

  async loadProducts(vendor: VendorDto) {
    let result = await this._productService.getByVendorId(vendor.id);
    this.ModelProducts = [];
    this.Model.details = [];
    this.Products = result;
    this.DxDataSourceProduct = this.getDataSourceDx(result);
  }

  async loadVendors() {
    let result = await this._vendorService.getActives();
    this.DxDataSourceVendor = this.getDataSourceDx(result);
  }

  async loadDetailStatus() {
    let result = await this._enumService.getDetailStatus();
    this.DxDataSourceDetailStatus = this.getDataSourceDx(result);
  }

  async initializeView() {
    this.errors = {};
    await this.loadVendors();
    await this.loadDetailStatus();
    await this.loadInvoiceType();
  }

  async loadInvoiceType() {
    let result = [{
      name: 'Credito'
    }, {
      name: 'Contado'
    }];
    console.log(result);
    this.DxDataSourceInvoiceType = this.getDataSourceDx(result);
  }

  async showUpdate(id: number) {
    //await this.initializeView();
    //this.setButtonOptions(true);
    await this.loadPurchaseOrderInfo(id);
  }

  async loadPurchaseOrderInfo(id: number) {
    let result = await this._purchaseOrderService.getById(id);
    console.log(result);
    this.Model = result;
    this.title = 'Editar Orden de Compra # '+this.Model.reference;
    let products = await this._productService.getByVendorId(result.vendorId);
    this.Products = products;
    this.DxDataSourceProduct = this.getDataSourceDx(products);
  }

  addProducts() {
    for(let product of this.ModelProducts) {
      const existProduct = this.Products.find(x => x.id === product);
      if(existProduct) {
        const detail = new PurchaseOrderDetailDto();
        detail.productVendorId = existProduct.id;
        detail.productId = existProduct.productId;
        detail.product = `${existProduct.name}`;
        detail.cost = existProduct.cost;
        detail.quantity = 0;
        detail.tax = 0;
        detail.taxPercentage = existProduct.taxRate;
        detail.discount = 0;
        detail.discountPercentage = existProduct.discount;
        detail.subTotal = 0;
        detail.total = 0;
        detail.id = 0;
        this.Model.details.push(detail);
      }
    }
    this.ModelProducts = [];
  }

  onQuantityChange(data: PurchaseOrderDetailDto) {
    data.subTotal = this.roundTo(data.cost * data.quantity, 3);
    data.discount = this.roundTo(data.discountPercentage >= 1 ? (data.quantity * data.discountPercentage): data.subTotal * data.discountPercentage, 3);

    data.tax = this.roundTo((data.subTotal - data.discount) * data.taxPercentage, 3);
    data.total = this.roundTo(data.subTotal + data.tax - data.discount, 3);
    this.refreshDataGrid();
  }

  onReceivedChange(data: PurchaseOrderDetailDto) {
    data.subTotalRecived = this.roundTo(data.quantityRecived * data.costRecived, 3);
    data.discountRecived = this.roundTo(data.discountPercentage >= 1 ? (data.quantityRecived * data.discountPercentage): data.subTotalRecived * data.discountPercentage, 3);
    data.taxRecived = this.roundTo((data.subTotalRecived - data.discountRecived) * data.taxPercentage, 3);
    data.totalRecived = this.roundTo(data.subTotalRecived + data.taxRecived - data.discountRecived, 3);
    this.refreshDataGrid();
  }

  removeProduct(data: PurchaseOrderDetailDto) {
    this.Model.details = this.Model.details.filter(x => x !== data);
    this.refreshDataGrid();
  }

  refreshDataGrid() {
    if (this.dataGrid) {
      this.dataGrid.instance.refresh();
    }
  }

  async save() {
    console.log(this.Model);
    let question = await this.customConfirm('¿Está seguro de guardar la orden de compra?', 'Esta acción no se puede revertir');
    if(question.value) {
      if(this.Model.details.some(x => x.quantity === 0)) {
        this.error('Error', 'La cantidad de los productos no puede ser 0');
        return;
      }

      if(this.id > 0) {
        this.Model.id = this.id;
        var result = await this._purchaseOrderService.update(this.Model, this.id);
        if(result.success) {
          this.success('Success', 'La orden de compra se ha editado correctamente');
          this._router.navigate(['/purchase-order/update/'+this.id]);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      } else {
        var result = await this._purchaseOrderService.create(this.Model);
        if(result.success) {
          this.success('Success', 'La orden de compra se ha guardado correctamente');
          this._router.navigate(['/purchase-order/update/'+result.data]);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      }
      
    }
  }

  async saveClose() {
    console.log(this.Model);
    let question = await this.customConfirm('¿Está seguro de guardar la orden de compra?', 'Esta acción no se puede revertir');
    if(question.value) {
      if(this.Model.details.some(x => x.quantity === 0)) {
        this.error('Error', 'La cantidad de los productos no puede ser 0');
        return;
      }
      if(this.id > 0) {
        this.Model.id = this.id;
        var result = await this._purchaseOrderService.update(this.Model, this.id);
        if(result.success) {
          this.success('Success', 'La orden de compra se ha editado correctamente');
          this.closeTab();
        }
      } else {
        var result = await this._purchaseOrderService.create(this.Model);
        if(result.success) {
          this.success('Success', 'La orden de compra se ha guardado correctamente');
          this.closeTab();
        }
      }
    }
  }

  async approve() {
    console.log(this.Model);
    let question = await this.customConfirm('¿Está seguro de aprobar la orden de compra?', 'Esta acción no se puede revertir');
    if(question.value) {
      var result = await this._purchaseOrderService.updateStatus(this.id);
      console.log(result);
      if(result.success) {
        this.success('Success', 'Accion realizada correctamente');
        this.closeTab();
      } else {
        this.error(result.title, result.messageResponse);
        this.errors = result.errors;
      }
    }
  }

  async onClickView() {
    let file = await this._purchaseOrderService.getPurchaseOrderFile(this.Model.id);
    this.openPdfInNewTab(file, `Orden de Compra ${this.Model.reference}.pdf`);
  }

  async viewOrderVendor() {
    let file = await this._purchaseOrderService.getPurchaseOrderVendorFile(this.Model.id);
    this.openPdfInNewTab(file, `Orden de Compra Proveedor ${this.Model.reference}.pdf`);
  }

  onDetailStatusChange(data: PurchaseOrderDetailDto) {
    if(data.detailStatus === DetailStatusEnum.Received) {
      data.quantityRecived = data.quantity;
      data.costRecived = data.cost;
      data.totalRecived = data.total;
      data.taxRecived = data.tax;
      data.discountRecived = data.discount;
      data.subTotalRecived = data.subTotal;
    }
    if(data.detailStatus === DetailStatusEnum.Out_Of_Stock) {
      data.quantityRecived = 0;
      data.costRecived = 0;
      data.totalRecived = 0;
      data.taxRecived = 0;
      data.discountRecived = 0;
      data.subTotalRecived = 0;

    }
    if(data.detailStatus === DetailStatusEnum.Price_Changed) {
      data.quantityRecived = data.quantity;
    }
    if(data.detailStatus === DetailStatusEnum.Partially_Received) {
      data.costRecived = data.cost;
    }
    if(data.detailStatus === DetailStatusEnum.Quantity_Mismatch) {
      data.costRecived = data.cost;
    }

    if(data.detailStatus === DetailStatusEnum.Pending) {
      data.quantityRecived = 0;
      data.costRecived = 0;
      data.totalRecived = 0;
      data.taxRecived = 0;
      data.discountRecived = 0;
      data.subTotalRecived = 0;
    }
    
    
    this.refreshDataGrid();
  }

  rejectPurchaseOrder() {
    Swal.fire({
      title: "Ingrese el motivo de rechazo",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Rechazar",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        console.log(login);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      
      this.rejectPurchaseOrderProcess(result.value);
    });
  }

  cancel() {
    Swal.fire({
      title: "Ingrese el motivo de cancelación",
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        console.log(login);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      
      this.cancelPurchaseOrderProcess(result.value);
    });
  }

  async rejectPurchaseOrderProcess(reason: string) {
    var model = {
      purchaseOrderId: this.id,
      reason: reason
    }
    var result = await this._purchaseOrderService.rejectPurchaseOrder(model);
    if(result.success) {
      this.success('Success', 'La orden de compra se ha editado correctamente');
      this.closeTab();
    } else {
      this.error(result.title, result.messageResponse);
      this.errors = result.errors;
    }
  }

  async cancelPurchaseOrderProcess(reason: string) {
    var model = {
      purchaseOrderId: this.id,
      reason: reason
    }
    var result = await this._purchaseOrderService.cancelPurchaseOrder(model);
    if(result.success) {
      this.success('Success', 'La orden de compra se ha editado correctamente');
      this.closeTab();
    } else {
      this.error(result.title, result.messageResponse);
      this.errors = result.errors;
    }
  }

  closeTab() {
    try {
      window.close();
    } catch (error) {
      console.log('No se pudo cerrar la pestaña automáticamente:', error);
      // Alternativa: mostrar un mensaje al usuario para que cierre manualmente
      this.success('Información', 'Por favor, cierre esta pestaña manualmente.');
    }
  }

}
