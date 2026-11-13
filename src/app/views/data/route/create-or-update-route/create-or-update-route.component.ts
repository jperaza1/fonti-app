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
    this.markSavedCreditPrices();
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
    if(!this.isValidPrice(this.detail.price)) {
      this.error('Error', this.priceError(this.detail.price));
      return;
    }
    if (!this.Model.givesCredit) {
      this.detail.showCreditPrice = false;
    }
    if (this.detail.showCreditPrice && !(this.detail.price > 0)) {
      this.error('Error', 'El precio que se muestra al crédito tiene que ser mayor a 0');
      return;
    }
    if (this.detail.showCreditPrice) {
      this.Model.productRoutePrices
        .filter(item => item.productId === this.detail.productId)
        .forEach(item => {
          item.showCreditPrice = false;
          item.creditPrice = null;
        });
    }
    this.applyCreditPrice(this.detail);
    this.Model.productRoutePrices.push(this.detail);
    this.detail = new ProductRoutePricesDto();
  }

  isValidPrice(price: number): boolean {
    if (price == null || price == undefined || price < 0) {
      return false;
    }
    return this.Model.deliversRegalia || price > 0;
  }

  priceError(price: number): string {
    if (price == null || price == undefined) {
      return 'El precio es requerido';
    }
    if (this.Model.deliversRegalia) {
      return 'El precio no puede ser negativo';
    }
    return 'El precio debe ser mayor a 0';
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
    const invalidPrice = this.Model.productRoutePrices.find(item => !this.isValidPrice(item.price));
    if (invalidPrice) {
      this.error('Error', this.Model.deliversRegalia
        ? 'El precio no puede ser negativo'
        : 'Esta ruta no entrega regalía. Los precios deben ser mayores a 0');
      return;
    }
    const invalidCredit = this.Model.productRoutePrices.find(
      item => this.Model.givesCredit && item.showCreditPrice && !(item.price > 0)
    );
    if (invalidCredit) {
      this.error('Error', 'El precio que se muestra al crédito tiene que ser mayor a 0');
      return;
    }
    this.Model.productRoutePrices.forEach(item => {
      if (!this.Model.givesCredit) {
        item.showCreditPrice = false;
      }
      this.applyCreditPrice(item);
    });

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

  onShowCreditPrice(detail: ProductRoutePricesDto) {
    if (detail.showCreditPrice) {
      this.Model.productRoutePrices
        .filter(item => item !== detail && item.productId === detail.productId)
        .forEach(item => {
          item.showCreditPrice = false;
          item.creditPrice = null;
        });
    }
    this.applyCreditPrice(detail);
    this.Model.productRoutePrices = [...this.Model.productRoutePrices];
  }

  markSavedCreditPrices() {
    (this.Model.productRoutePrices || []).forEach(item => {
      if (item.showCreditPrice == null) {
        item.showCreditPrice = item.creditPrice != null && item.creditPrice > 0;
      }
    });
  }

  applyCreditPrice(detail: ProductRoutePricesDto) {
    detail.creditPrice = detail.showCreditPrice && detail.price > 0 ? detail.price : null;
  }

  onItemClickProduct(item: ProductDto) {
    console.log(item);
    this.detail.productName = item.name;
  }

  removeDetail(detail: ProductRoutePricesDto) {
    this.Model.productRoutePrices = this.Model.productRoutePrices.filter(item => item.id !== detail.id);
  }
}
