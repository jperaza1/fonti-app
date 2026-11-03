import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductRecipeDetailDto, ProductRecipeDto } from '../dtos/product-recipe-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { ProductRecipeService } from '../product-recipe.service';
import { ProductService } from '../../../data/product/product.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';

@Component({
  selector: 'app-create-or-update-product-recipe',
  templateUrl: './create-or-update-product-recipe.component.html',
  styleUrls: ['./create-or-update-product-recipe.component.css'],
})
export class CreateOrUpdateProductRecipeComponent extends AppComponentBase implements OnInit {
  Model: ProductRecipeDto = new ProductRecipeDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Receta';
  saleProducts: any[] = [];
  rawMaterials: any[] = [];

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _productRecipeService: ProductRecipeService,
    private _productService: ProductService
  ) {
    super();
  }

  ngOnInit(): void {}

  async initializeView() {
    this.errors = {};
    const sales = await this._productService.getActives(1);
    const materials = await this._productService.getActives(3);
    this.saleProducts = (sales || []).map((item) => ({ text: item.name, value: item.id }));
    this.rawMaterials = (materials || []).map((item) => ({
      text: item.unitOfMeasureName ? `${item.name} (${item.unitOfMeasureName})` : item.name,
      value: item.id,
    }));
  }

  setButtonOptions() {
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', []),
    ];
  }

  async showUpdate(data: ProductRecipeDto) {
    this.title = 'Editar receta';
    await this.initializeView();
    this.setButtonOptions();
    this.Model = await this._productRecipeService.getByProduct(data.productId);
    if (!this.Model.details) {
      this.Model.details = [];
    }
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nueva receta';
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new ProductRecipeDto();
    this.Model.unitsPerPackage = 10;
    this.Model.details = [];
    this.addDetail();
    this.entityComponent.show();
  }

  addDetail() {
    const detail = new ProductRecipeDetailDto();
    detail.quantity = 1;
    detail.producedUnits = 1;
    detail.perPackage = false;
    this.Model.details.push(detail);
  }

  removeDetail(index: number) {
    this.Model.details.splice(index, 1);
  }

  quantityPerUnit(detail: ProductRecipeDetailDto): number {
    if (!detail || !detail.quantity) {
      return 0;
    }
    if (detail.perPackage) {
      return detail.quantity;
    }
    if (!detail.producedUnits || !this.Model.unitsPerPackage) {
      return 0;
    }
    return (detail.quantity * this.Model.unitsPerPackage) / detail.producedUnits;
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'save':
        this.save();
        break;
      case 'close':
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
    const response = await this._productRecipeService.save(this.Model);
    this.validResponse(response);
  }

  close() {
    this.entityComponent.close();
  }
}
