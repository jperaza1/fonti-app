import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '../../../../AppComponentBase';
import { OptionButton } from '../../../shared/models/option-button';
import { ModalWithOptionButtonsComponent } from '../../../shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { SaleService } from '../sale.service';
import { CustomerService } from '../../../data/customer/customer.service';
import { RouteService } from '../../../data/route/route.service';
import { SaleDto } from '../dtos/sale-dto';
import { FilterSaleDto } from '../dtos/filter-sale-dto';
import { RequestResult } from '../../../../../_models/RequestResult';

@Component({
  selector: 'app-consolidate-sale',
  templateUrl: './consolidate-sale.component.html',
  styleUrls: ['./consolidate-sale.component.scss']
})
export class ConsolidateSaleComponent extends AppComponentBase {
  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();

  title = 'Facturar al Contado';
  OptionButtons: OptionButton[] = [];
  errors: any = {};
  routeId: number = null;
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  saleDate: Date = new Date();
  customerId: number = null;
  DxDataSourceRoute: any = {};
  DxDataSourceCustomer: any = {};
  sales: SaleDto[] = [];
  lines: { productId: number; product: string; price: number; available: number; quantity: number }[] = [];
  selected: { [id: number]: boolean } = {};
  saving = false;

  constructor(
    private _saleService: SaleService,
    private _customerService: CustomerService,
    private _routeService: RouteService
  ) {
    super();
  }

  async show(filter: FilterSaleDto) {
    this.errors = {};
    this.routeId = filter && filter.routeId > 0 ? filter.routeId : null;
    this.dateFrom = filter && filter.dateFrom ? new Date(filter.dateFrom) : new Date();
    this.dateTo = filter && filter.dateTo ? new Date(filter.dateTo) : new Date();
    this.saleDate = new Date();
    this.customerId = null;
    this.sales = [];
    this.lines = [];
    this.selected = {};
    this.saving = false;
    this.setButtons();
    await this.getRoutes();
    await this.getCustomers();
    this.entityComponent.show();
    if (this.routeId) {
      await this.search();
    }
  }

  setButtons() {
    const save = new OptionButton('save', 'Save', 'btn btn-success pull-right', 'fa fa-save', ['OPERATION.SALE.CONSOLIDATE']);
    save.disabled = this.saving;
    this.OptionButtons = [
      new OptionButton('close', 'Close', 'btn btn-danger pull-right', 'fa fa-times'),
      save
    ];
  }

  async getRoutes() {
    const response = await this._routeService.getActives();
    this.DxDataSourceRoute = this.getDataSourceDx(response);
  }

  async getCustomers() {
    const response = await this._customerService.getAllActive();
    this.DxDataSourceCustomer = this.getDataSourceDx(response);
  }

  async search() {
    if (!this.routeId) {
      this.error('VENTAS', 'Selecciona la ruta.');
      return;
    }

    const filter = new FilterSaleDto();
    filter.routeId = this.routeId;
    filter.dateFrom = this.dateFrom;
    filter.dateTo = this.dateTo;
    filter.saleType = 1;
    const result = await this._saleService.getAll(filter);
    this.sales = (result || []).filter((sale) => sale.isActive && sale.saleType == 1 && !sale.saleInvoiceId);
    this.selected = {};
    this.sales.forEach((sale) => (this.selected[sale.id] = true));
    await this.loadAvailability();
  }

  async toggle(sale: SaleDto) {
    this.selected[sale.id] = !this.selected[sale.id];
    await this.loadAvailability();
  }

  async loadAvailability() {
    const saleIds = this.sales.filter((sale) => this.selected[sale.id]).map((sale) => sale.id);
    if (!saleIds.length || !this.routeId) {
      this.lines = [];
      return;
    }

    const result = await this._saleService.getConsolidateAvailability({ routeId: this.routeId, saleIds });
    const previous = {};
    this.lines.forEach((line) => (previous[line.productId + '-' + line.price] = line.quantity));
    this.lines = (result || []).map((line) => ({
      productId: line.productId,
      product: line.product,
      price: line.price,
      available: line.quantity,
      quantity: previous[line.productId + '-' + line.price] || 0
    }));
  }

  optionButtonClicked($event: OptionButton) {
    if ($event.btnName === 'save') {
      this.save();
    } else if ($event.btnName === 'close') {
      this.entityComponent.close();
    }
  }

  async save() {
    const saleIds = this.sales.filter((sale) => this.selected[sale.id]).map((sale) => sale.id);
    const lines = this.lines
      .filter((line) => line.quantity > 0)
      .map((line) => ({ productId: line.productId, price: line.price, quantity: Number(line.quantity) }));

    if (!lines.length) {
      this.error('VENTAS', 'Indica cuántos botes quieres sacar.');
      return;
    }

    this.saving = true;
    this.setButtons();
    const result = await this._saleService.consolidate({
      routeId: this.routeId,
      customerId: this.customerId,
      saleDate: this.saleDate,
      saleIds,
      lines
    });
    this.saving = false;
    this.setButtons();
    this.validResponse(result);
  }

  validResponse(requestResult: RequestResult) {
    if (requestResult.success) {
      this.success(requestResult.title, requestResult.messageResponse);
      this.modalSave.emit();
      this.entityComponent.close();
      return;
    }

    this.error(requestResult.title, requestResult.messageResponse);
    this.errors = requestResult.errors;
  }
}
