import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { ProductRoutePricesDto, RouteDto } from '../dtos/route-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { RouteService } from '../route.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { ProductService } from '../../product/product.service';
import { ProductDto } from '../../product/dtos/product-dto';

@Component({
  selector: 'app-create-or-update-route',
  templateUrl: './create-or-update-route.component.html',
  styleUrls: ['./create-or-update-route.component.css'],
})
export class CreateOrUpdateRouteComponent extends AppComponentBase implements OnInit {
  Model: RouteDto = new RouteDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Ruta';

  detail: ProductRoutePricesDto = new ProductRoutePricesDto();

  DxDataSourceProduct: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _routeService: RouteService, 
    private _productService: ProductService) {
    super();
  }

  ngOnInit(): void {}

  async initializeView() {
    this.errors = {};
    await this.getProducts();
  }

  async getProducts() {
    const response = await this._productService.getActives(1);
    this.DxDataSourceProduct = this.getDataSourceDx(response);
  }

  setButtonOptions(update?: boolean | null) {
    const permission: string[] = [];
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', permission),
    ];
  }

  async showUpdate(data: RouteDto) {
    this.title = 'Editar Ruta';
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._routeService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nueva Ruta';
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new RouteDto();
    this.entityComponent.show();
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

  addDetail() {
    if(this.isEmptyOrNullNumber(this.detail.productId)) {
      this.error('Error', 'El producto es requerido');
      return;
    }
    if(this.isEmptyOrNullNumber(this.detail.price)) {
      this.error('Error', 'El precio es requerido');
      return;
    }
    this.Model.productRoutePrices.push(this.detail);
    this.detail = new ProductRoutePricesDto();
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
      const createResponse = await this._routeService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._routeService.update(
        this.Model,
        this.Model.id
      );
      this.validResponse(updateResponse);
    }
  }

  close() {
    this.entityComponent.close();
  }

  onItemClickProduct(item: ProductDto) {
    console.log(item);
    this.detail.productName = item.name;
  }

  removeDetail(detail: ProductRoutePricesDto) {
    this.Model.productRoutePrices = this.Model.productRoutePrices.filter(item => item.id !== detail.id);
  }
}
