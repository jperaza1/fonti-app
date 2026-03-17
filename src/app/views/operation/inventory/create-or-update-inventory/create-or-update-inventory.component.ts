import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryDetailDto, InventoryDto } from '../dtos/inventory.dto';
import { ProductDto } from '../../../data/product/dtos/product-dto';
import { Subscription } from 'rxjs';
import { User } from '../../../../../_models/user';
import { DxDataGridComponent } from 'devextreme-angular';
import { InventoryService } from '../inventory-order.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { ProductService } from '../../../data/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { AppComponentBase } from '../../../../AppComponentBase';
import { RegisterService } from '../../../data/register/register.service';

@Component({
  selector: 'app-create-or-update-inventory',
  templateUrl: './create-or-update-inventory.component.html',
  styleUrls: ['./create-or-update-inventory.component.css']
})
export class CreateOrUpdateInventoryComponent extends AppComponentBase implements OnInit {
  title: string = 'Crear Inventario';

  Model: InventoryDto = new InventoryDto();
  Products: ProductDto[] = [];
  ModelProducts: any[] = [];
  errors: any = {};


  DxDataSourceCafeteria: any = {};
  DxDataSourceProduct: any = {};
  DxDataSourceDetailStatus: any = {};
  DxDataSourceRegister: any = {};
  DxDataSourceInventoryType: any = {};
  routeSub: Subscription;

  id: number
  currentUser: User;
  @ViewChild('dataGrid', { static: false }) dataGrid: DxDataGridComponent;


  constructor(
    private _inventoryService: InventoryService,
    private _cafeteriaService: CafeteriaService,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _registerService: RegisterService
  ) {
    super();
    this.routeSub = this._route.params.subscribe((params) => {
      this.id = params['id']
    });
   }

   async ngOnInit() {
    await this.initializeView();
    this.routeSub.unsubscribe();
    this.currentUser = this._authenticationService.currentUserValue;
    this.Model.cafeteriaId = this.currentUser.cafeteriaId ?? 0;
    if(this.id > 0) await this.showUpdate(this.id);
    this.DxDataSourceInventoryType = [{
      id: 1,
      name: 'Producción'
    }, {
      id: 2,
      name: 'Comercialización'
    }]
  }

  async initializeView() {
    this.errors = {};
    await this.loadProducts();
    await this.loadCafeterias();
  }

  async loadCafeterias() {
    let result = await this._cafeteriaService.getActives();
    this.DxDataSourceCafeteria = this.getDataSourceDx(result);
  }

  async loadProducts() {
    let result = await this._productService.getActives();
    this.ModelProducts = [];
    this.Model.details = [];
    this.Products = result;
    this.DxDataSourceProduct = this.getDataSourceDx(result);
  }

  async showUpdate(id: number) {
    //await this.initializeView();
    //this.setButtonOptions(true);
    await this.loadInventoryInfo(id);
  }

  async loadInventoryInfo(id: number) {
    let result = await this._inventoryService.getById(id);
    this.Model = result;
    this.title = 'Editar Inventario # '+this.Model.reference;
    this.DxDataSourceProduct = this.getDataSourceDx(this.Products.filter(x => !this.Model.details.find(y => y.productId === x.id)));
    let resultRegister = await this._registerService.getByCafeteriaInventory(this.Model.cafeteriaId);
    this.DxDataSourceRegister = this.getDataSourceDx(resultRegister);

  }

  addProducts() {
    for(let product of this.ModelProducts) {
      const existProduct = this.Products.find(x => x.id === product);
      const existDetail = this.Model.details.find(x => x.productId === existProduct.id);
      if(existProduct && !existDetail) {
        const detail = new InventoryDetailDto();
        detail.productId = existProduct.id;
        detail.product = `${existProduct.name}`;
        detail.cost = existProduct.cost;
        detail.unitCost = existProduct.unitCost;
        detail.unitQuantity = 0;
        detail.quantityPack = 0;
        detail.tax = 0;
        detail.taxPercentage = existProduct.tax;
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

  async save() {
    let question = await this.customConfirm('¿Está seguro de guardar el inventario?', 'Esta acción no se puede revertir');
    if(question.value) {
      this.Model.details = this.Model.details.filter(x => x.unitQuantity > 0 || x.quantityPack > 0);
      
      if(this.Model.details.length === 0) {
        this.error('Error', 'No se puede guardar el inventario sin productos');
        return;
      }

      if(this.id > 0) {
        this.Model.id = this.id;
        var result = await this._inventoryService.update(this.Model, this.id);
        if(result.success) {
          this.success('Success', 'El inventario se ha editado correctamente');
          this._router.navigate(['/inventory/update/'+this.id]);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      } else {
        var result = await this._inventoryService.create(this.Model);
        if(result.success) {
          this.success('Success', 'El inventario se ha guardado correctamente');
          this._router.navigate(['/inventory/update/'+result.data]);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      }
    }
  }

  onQuantityChange(data: InventoryDetailDto) {
    const subTotalPack = this.roundTo(data.cost * data.quantityPack, 3);
    const subTotalUnit = this.roundTo(data.unitCost * data.unitQuantity, 3);

    data.subTotal = this.roundTo(subTotalPack + subTotalUnit, 3);
    data.discount = this.roundTo(data.discountPercentage >= 1 ? (data.quantityPack * data.discountPercentage): data.subTotal * data.discountPercentage, 3);

    data.tax = this.roundTo((data.subTotal - data.discount) * data.taxPercentage, 3);
    data.total = this.roundTo(data.subTotal + data.tax - data.discount, 3);
    this.refreshDataGrid();
  }

  refreshDataGrid() {
    if (this.dataGrid) {
      this.dataGrid.instance.refresh();
    }
  }

  async recalculateDataGrid() {
    for(let detail of this.Model.details) {
      const subTotalPack = this.roundTo(detail.cost * detail.quantityPack, 3);
      const subTotalUnit = this.roundTo(detail.unitCost * detail.unitQuantity, 3);

      detail.subTotal = this.roundTo(subTotalPack + subTotalUnit, 3);
      detail.discount = this.roundTo(detail.discountPercentage >= 1 ? (detail.quantityPack * detail.discountPercentage): detail.subTotal * detail.discountPercentage, 3);

      detail.tax = this.roundTo((detail.subTotal - detail.discount) * detail.taxPercentage, 3);
      detail.total = this.roundTo(detail.subTotal + detail.tax - detail.discount, 3);
      //this.refreshDataGrid();
    }
    this.dataGrid.instance.refresh();
  }

  async onCafeteriaChange() {
    this.Model.details = [];
    let result = await this._registerService.getByCafeteriaInventory(this.Model.cafeteriaId);
    this.DxDataSourceRegister = this.getDataSourceDx(result);
  }

  removeProduct(data: InventoryDetailDto) {
    this.Model.details = this.Model.details.filter(x => x !== data);
    this.refreshDataGrid();
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
