import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductDto, ProductVendorDto } from '../dtos/product-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ProductService } from '../product.service';
import { VendorService } from '../../vendor/vendor.service';
import { VendorDto } from '../../vendor/dtos/vendor-dto';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { EnumDefinitionsService } from '../../../../../_services/enum-definitions.service';
import { UnitOfMeasureService } from '../../../operation/unit-of-measure/unit-of-measure.service';

@Component({
  selector: 'app-create-or-update-product',
  templateUrl: './create-or-update-product.component.html',
  styleUrls: ['./create-or-update-product.component.css']
})
export class CreateOrUpdateProductComponent extends AppComponentBase implements OnInit {
  Model: ProductDto = new ProductDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = "Producto";

  DxDataSourceProductType: any = {};
  DxDataSourceVendor: any = {};
  units: any[] = [];
  vendors: VendorDto[] = [];
  productVendor: ProductVendorDto = new ProductVendorDto();
  readonly rawMaterialType = 3;

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();


  constructor(
    private _productService: ProductService,
    private _enumDefinitionsService: EnumDefinitionsService,
    private _unitOfMeasureService: UnitOfMeasureService,
    private _vendorService: VendorService
  ) {   
    super();
  }

  ngOnInit(): void {
  }

  

  async initializeView() {
    this.errors = {};
    this.productVendor = new ProductVendorDto();
    await this.getProductTypes();
    const units = await this._unitOfMeasureService.getActives();
    this.units = (units || []).map((item) => ({ text: item.name, value: item.id }));
    this.vendors = await this._vendorService.getActives() || [];
    this.DxDataSourceVendor = this.getDataSourceDx(this.vendors);
  }

  async getProductTypes() {
    const response = await this._enumDefinitionsService.getProductType();
    this.DxDataSourceProductType = this.getDataSourceDx(response);
  }

  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    // if (update != null && update === true)
    //   permission.push("TYPES.UPDATE");
    // else
    //   permission.push("TYPES.CREATE");
    this.OptionButtons = [
      new OptionButton("close", "Close", "btn btn-danger pull-right", "fa fa-times"),
      new OptionButton("save", "Save", "btn btn-success pull-right", "fa fa-save", permission)
    ];
  }

  async showUpdate(data: ProductDto) {
    this.title = "Editar Producto";
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._productService.getById(data.id);
    if (!this.Model.productVendors) {
      this.Model.productVendors = [];
    }
    this.productVendor = new ProductVendorDto();
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = "Nuevo Producto";
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new ProductDto();
    this.entityComponent.show();
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.save();
        break;
      case "close":
        this.close();
        break;
    }
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.close();
    } else {
      this.error(requestResult.title, requestResult.messageResponse);
      this.errors = requestResult.errors;
    }
  }

  async save() {
    if (this.Model.productType !== this.rawMaterialType) {
      this.Model.productVendors = [];
      this.Model.cost = null;
      this.Model.unitOfMeasureId = null;
    } else if (!this.Model.productVendors || !this.Model.productVendors.some((item) => item.isActive)) {
      this.error('PRODUCTO', 'Se requiere agregar proveedores');
      return;
    }

    if (this.isEmptyOrNullNumber(this.Model.id)) {
      let createResponse = await this._productService.create(this.Model);
      this.validResponse(createResponse);

    } else {

      let updateResponse = await this._productService.update(this.Model, this.Model.id);
      this.validResponse(updateResponse);

    }
  }

  close() {
    this.entityComponent.close();
  }

  addProductVendor() {
    if (!this.Model.productVendors) {
      this.Model.productVendors = [];
    }

    if (this.isEmptyOrNullNumber(this.productVendor.vendorId)) {
      this.error('PRODUCTO', 'El proveedor es requerido');
      return;
    }
    if (this.isEmptyOrNullNumber(this.productVendor.unitOfMeasureId)) {
      this.error('PRODUCTO', 'La unidad de medida es requerida');
      return;
    }
    if (this.isEmptyOrNullNumber(this.productVendor.unit)) {
      this.error('PRODUCTO', 'Las unidades por medida deben ser mayor a cero');
      return;
    }
    if (this.isEmptyOrNullNumber(this.productVendor.cost)) {
      this.error('PRODUCTO', 'El costo es requerido');
      return;
    }
    if (this.isEmptyOrNullNumber(this.productVendor.unitCost)) {
      this.error('PRODUCTO', 'El costo unitario es requerido');
      return;
    }
    if (this.productVendor.discount != null && this.productVendor.discount < 0) {
      this.error('PRODUCTO', 'El descuento no puede ser negativo');
      return;
    }

    const duplicated = this.Model.productVendors.some((item) =>
      item.isActive
      && item.vendorId === this.productVendor.vendorId
      && item.unitOfMeasureId === this.productVendor.unitOfMeasureId);
    if (duplicated) {
      this.error('PRODUCTO', 'El proveedor ya tiene esa unidad de medida');
      return;
    }

    const vendor = this.vendors.find((item) => item.id === this.productVendor.vendorId);
    const measure = this.units.find((item) => item.value === this.productVendor.unitOfMeasureId);
    this.productVendor.vendorName = vendor ? vendor.name : '';
    this.productVendor.unitOfMeasureName = measure ? measure.text : '';
    this.productVendor.isActive = true;
    this.Model.productVendors = [...this.Model.productVendors, this.productVendor];
    this.productVendor = new ProductVendorDto();
  }

  removeProductVendor(productVendor: ProductVendorDto) {
    productVendor.isActive = false;
    this.Model.productVendors = [...this.Model.productVendors];
  }

  activateProductVendor(productVendor: ProductVendorDto) {
    productVendor.isActive = true;
    this.Model.productVendors = [...this.Model.productVendors];
  }

}
