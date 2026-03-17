import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeRequisitionService } from '../office-requisition.service';
import { CafeteriaService } from '../../../data/cafeteria/cafeteria.service';
import { ProductService } from '../../../data/product/product.service';
import { AuthenticationService } from '../../../../../_services/authentication.service';
import { ProductDto } from '../../../data/product/dtos/product-dto';
import { OfficeRequisitionDetailDto, OfficeRequisitionDto } from '../dtos/office-requisition.dto';
import { User } from '../../../../../_models/user';
import { Subscription } from 'rxjs';
import { DxDataGridComponent } from 'devextreme-angular';
import Swal, { SweetAlertResult } from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-create-or-update-office-requisition',
  templateUrl: './create-or-update-office-requisition.component.html',
  styleUrls: ['./create-or-update-office-requisition.component.css']
})
export class CreateOrUpdateOfficeRequisitionComponent extends AppComponentBase implements OnInit {

  Model: OfficeRequisitionDto = new OfficeRequisitionDto();
  Products: ProductDto[] = [];
  ModelProducts: any[] = [];
  errors: any = {};

  title: string = 'Nueva Orden de Requisición';

  DxDataSourceCafeteria: any = {};
  DxDataSourceProduct: any = {};

  routeSub: Subscription;

  id: number
  currentUser: User;
  @ViewChild('dataGrid', { static: false }) dataGrid: DxDataGridComponent;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _officeRequisitionService: OfficeRequisitionService,
    private _cafeteriaService: CafeteriaService,
    private _productService: ProductService,
    private _authenticationService: AuthenticationService,
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
    this.Model.cafeteriaId = this.currentUser.cafeteriaId;
    if(this.id > 0) await this.showUpdate(this.id);
  }

  onItemClickCafeteria(itemData: any) {
    this.Model.cafeteria = itemData.name;
  }

  async loadProducts() {
    let result = await this._productService.getBySpecialService();
    this.ModelProducts = [];
    this.Model.details = [];
    this.Products = result;
    this.DxDataSourceProduct = this.getDataSourceDx(result);
  }

  async loadCafeterias() {
    let result = await this._cafeteriaService.getActives();
    this.DxDataSourceCafeteria = this.getDataSourceDx(result);
  }

  async initializeView() {
    this.errors = {};
    await this.loadProducts();
    await this.loadCafeterias();
    //await this.loadDetailStatus();
  }

  async showUpdate(id: number) {
    await this.initializeView();
    //this.setButtonOptions(true);
    await this.loadSpecialServiceInfo(id);
  }

  async loadSpecialServiceInfo(id: number) {
    let result = await this._officeRequisitionService.getById(id);
    this.Model = result;
    this.title = 'Editar Servicio Especial # '+this.Model.reference;
  }

  addProducts() {
    for(let product of this.ModelProducts) {
      const existProduct = this.Products.find(x => x.id === product);
      
      if(existProduct) {
        const existDetail = this.Model.details.find(x => x.productId === existProduct.id);
        if(!existDetail) {
          const detail = new OfficeRequisitionDetailDto();
          detail.productId = existProduct.id;
          detail.productName = `${existProduct.name}`;
          detail.quantity = 0;
          this.Model.details.push(detail);
        }
      }
    }
    this.ModelProducts = [];
  }

  refreshDataGrid() {
    if (this.dataGrid) {
      this.dataGrid.instance.refresh();
    }
  }

  return() {
    this._router.navigate(['/office-requisition']);
  }

  removeProduct(data: OfficeRequisitionDetailDto) {
    this.Model.details = this.Model.details.filter(x => x !== data);
    this.refreshDataGrid();
  }

  async save() {
    console.log(this.Model);
    let question = await this.customConfirm('¿Está seguro de guardar el servicio especial?', 'Esta acción no se puede revertir');
    if(question.value) {
      if(this.Model.details.some(x => x.quantity === 0)) {
        this.error('Error', 'La cantidad de los productos no puede ser 0');
        return;
      }

      if(this.id > 0) {
        this.Model.id = this.id;
        var result = await this._officeRequisitionService.update(this.Model, this.id);
        if(result.success) {
          this.success('Success', 'El servicio especial se ha editado correctamente');
          this._router.navigate(['/office-requisition/update/'+this.id]);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      } else {
        var result = await this._officeRequisitionService.create(this.Model);
        if(result.success) {
          this.success('Success', 'El servicio especial se ha guardado correctamente');
          this._router.navigate(['/office-requisition']);
        } else {
          this.error(result.title, result.messageResponse);
          this.errors = result.errors;
        }
      }
      
    }
  }

  async approve() {
    console.log(this.Model);
    let question = await this.customConfirm('¿Está seguro de aprobar la orden de compra?', 'Esta acción no se puede revertir');
    if(question.value) {
      var result = await this._officeRequisitionService.updateStatus(this.id);
      console.log(result);
      if(result.success) {
        this.success('Success', 'Accion realizada correctamente');
        this.return();
      } else {
        this.error(result.title, result.messageResponse);
        this.errors = result.errors;
      }
    }
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

  async rejectPurchaseOrderProcess(reason: string) {
    var model = {
      specialServiceId: this.id,
      reason: reason
    }
    var result = await this._officeRequisitionService.rejectOfficeRequisition(model);
    if(result.success) {
      this.success('Success', 'La orden de compra se ha editado correctamente');
      this._router.navigate(['/special-service']);
    } else {
      this.error(result.title, result.messageResponse);
      this.errors = result.errors;
    }
  }

}
