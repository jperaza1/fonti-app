import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { WarehouseDto, WarehouseTransferDetailDto, WarehouseTransferDto } from '../dtos/warehouse-transfer-dto';
import { WarehouseService } from '../warehouse.service';
import { WarehouseTransferService } from '../warehouse-transfer.service';
import { ProductService } from '../../../data/product/product.service';
import { ProductDto } from '../../../data/product/dtos/product-dto';

@Component({
  selector: 'app-create-warehouse-transfer',
  templateUrl: './create-warehouse-transfer.component.html',
})
export class CreateWarehouseTransferComponent extends AppComponentBase implements OnInit {
  title: string = 'Nueva transferencia';
  model: WarehouseTransferDto = new WarehouseTransferDto();
  warehouses: WarehouseDto[] = [];
  products: ProductDto[] = [];
  line: WarehouseTransferDetailDto = new WarehouseTransferDetailDto();
  errors: any = {};
  saving: boolean = false;

  constructor(
    private _warehouseService: WarehouseService,
    private _transferService: WarehouseTransferService,
    private _productService: ProductService
  ) {
    super();
  }

  async ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.model.date = today;
    this.line.quantity = 1;
    this.warehouses = await this._warehouseService.getAll();
    const principal = this.warehouses.find((item) => item.kind === 1);
    const production = this.warehouses.find((item) => item.kind === 2);
    if (principal) {
      this.model.fromWarehouseId = principal.id;
    }
    if (production) {
      this.model.toWarehouseId = production.id;
    }
    await this.loadProducts();
  }

  destination(): WarehouseDto {
    return this.warehouses.find((item) => item.id === this.model.toWarehouseId);
  }

  async loadProducts() {
    const destination = this.destination();
    this.products = [];
    this.line = new WarehouseTransferDetailDto();
    this.line.quantity = 1;
    if (!destination) {
      return;
    }
    const types = destination.kind === 3 ? [1] : destination.kind === 1 ? [2, 3] : [1, 2, 3];
    const lists = await Promise.all(types.map((type) => this._productService.getActives(type)));
    const merged: ProductDto[] = [];
    lists.forEach((rows) => {
      (rows || []).forEach((product) => {
        if (!merged.some((item) => item.id === product.id)) {
          merged.push(product);
        }
      });
    });
    this.products = merged.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  addLine() {
    if (!this.line.productId || !this.line.quantity || this.line.quantity <= 0) {
      this.error('TRANSFERENCIA', 'Elige un producto y una cantidad mayor a cero');
      return;
    }
    const product = this.products.find((item) => item.id === this.line.productId);
    const current = this.model.details.find((item) => item.productId === this.line.productId);
    if (current) {
      current.quantity = Number(current.quantity) + Number(this.line.quantity);
    } else {
      const detail = new WarehouseTransferDetailDto();
      detail.productId = this.line.productId;
      detail.product = product ? product.name : '';
      detail.quantity = Number(this.line.quantity);
      this.model.details.push(detail);
    }
    this.model.details = this.model.details.slice();
    this.line = new WarehouseTransferDetailDto();
    this.line.quantity = 1;
  }

  removeLine(row: WarehouseTransferDetailDto) {
    this.model.details = this.model.details.filter((item) => item !== row);
  }

  async save() {
    this.saving = true;
    this.errors = {};
    const response = await this._transferService.create(this.model);
    this.saving = false;
    if (response.success) {
      this.success(response.title, response.messageResponse);
      window.location.href = '/warehouse-transfer';
    } else {
      this.error(response.title, response.messageResponse);
      this.errors = response.errors;
    }
  }

  back() {
    window.location.href = '/warehouse-transfer';
  }
}
