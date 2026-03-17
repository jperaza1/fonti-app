import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductDto } from '../dtos/product-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ProductService } from '../product.service';
import { TypeService } from '../../type/type.service';
import { VendorService } from '../../vendor/vendor.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

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

  DxDataSourceMeasure: any = {};
  DxDataSourceVendor: any = {};

  @ViewChild("entityComponent") entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();


  constructor(
    private _productService: ProductService,
    private _typeService: TypeService,
    private _vendorService: VendorService
  ) {   
    super();
  }

  ngOnInit(): void {
  }

  async getVendors() {
    const response = await this._vendorService.getAll();
    this.DxDataSourceVendor = this.getDataSourceDx(response);
  }

  async getMeasures() {
    const response = await this._typeService.getAciteTypesByGroupCode("MEASUREMENT_UNIT");
    this.DxDataSourceMeasure = this.getDataSourceDx(response);
  }

  async initializeView() {
    this.errors = {};
    await this.getVendors();
    await this.getMeasures();
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

}
