import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { DistributorDto, ProductDistributorPricesDto } from '../dtos/distributor-dto';
import { OptionButton } from '../../../shared/models/option-button';
import { DistributorService } from '../distributor.service';
import { RequestResult } from '../../../../../_models/RequestResult';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { ProductService } from '../../product/product.service';
import { ProductDto } from '../../product/dtos/product-dto';

@Component({
  selector: 'app-create-or-update-distributor',
  templateUrl: './create-or-update-distributor.component.html',
  styleUrls: ['./create-or-update-distributor.component.css'],
})
export class CreateOrUpdateDistributorComponent extends AppComponentBase implements OnInit {
  Model: DistributorDto = new DistributorDto();
  OptionButtons: OptionButton[];
  errors: any = {};
  title: string = 'Distribuidor';

  detail: ProductDistributorPricesDto = new ProductDistributorPricesDto();

  DxDataSourceProduct: any = {};

  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  constructor(
    private _distributorService: DistributorService,
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

  async showUpdate(data: DistributorDto) {
    this.title = 'Editar Distribuidor';
    await this.initializeView();
    this.setButtonOptions(true);
    this.Model = await this._distributorService.getById(data.id);
    this.entityComponent.show();
  }

  async showAdd() {
    this.title = 'Nuevo Distribuidor';
    await this.initializeView();
    this.setButtonOptions();
    this.Model = new DistributorDto();
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
    if (this.isEmptyOrNullNumber(this.detail.productId)) {
      this.error('Error', 'El producto es requerido');
      return;
    }
    if (this.isEmptyOrNullNumber(this.detail.price)) {
      this.error('Error', 'El precio es requerido');
      return;
    }
    const alreadyAdded = this.Model.productDistributorPrices.some(
      (item) => item.productId === this.detail.productId
    );
    if (alreadyAdded) {
      this.error('Error', 'El producto ya está asociado a este distribuidor');
      return;
    }
    this.Model.productDistributorPrices.push(this.detail);
    this.detail = new ProductDistributorPricesDto();
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
      const createResponse = await this._distributorService.create(this.Model);
      this.validResponse(createResponse);
    } else {
      const updateResponse = await this._distributorService.update(
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
    this.detail.productName = item.name;
  }

  removeDetail(detail: ProductDistributorPricesDto) {
    this.Model.productDistributorPrices = this.Model.productDistributorPrices.filter(
      (item) => item !== detail
    );
  }
}
